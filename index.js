if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var Publishable_Key = 'pk_test_51K1bYMSBA7A7Kw5YXcq1uL8Beh5N0BJjU86uxd9H1FgMcnsNbkJfWbDv9jfU5MoSRsIU8NaGxEGYhdBued5agbXn00wFmlidve'
var Secret_Key = 'sk_test_51K1bYMSBA7A7Kw5YnoAfMI7Z3puR5PCdSszk40iMBkkkw3obKjfKs5lD1wbyxJ5XXj8Nak5Lh2TVCjoCkF76eiNA00DzDzt0ai'

const express = require("express");
const app = express();
const path = require("path");
const stripe = require('stripe')(Secret_Key)
const bodyparser = require('body-parser')
const { isLoggedIn } = require("./middleware");
const session = require("express-session");
const flash = require("connect-flash");
const mongoDB = require("./MongoDB/server");
const movieSchema = require("./models/movie");
const userSchema = require("./models/user");
const ejsMate = require("ejs-mate");
const data2 = require("./seeds/data2");
const { v4: uuid } = require("uuid");
// const  data  = require("./seeds/rapidapi");
const request = require("request");
const passport = require("passport");
const passportLocal = require("passport-local");
const ExpressError = require("./utils/Expresserror");
const catchAysnc = require("./utils/catchAysnc");
// const collectottdata=require('./seeds/ottdata');
const axios = require("axios").default;
const options = require("./seeds/ottdata");
// const { authenticate } = require("passport");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoDB();
// Set the default templating engine to ejs


const sessionConfig = {
  secret: "123456789",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(userSchema.authenticate()));
passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;

  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));



app.get("/", async (req, res) => {
  res.render("firstview");
});


app.get( "/movies", catchAysnc(async (req, res) => {
  const data=await movieSchema.find({});
  // console.log(typeof(data));
  
    res.render('home',{data});
  })
);

//payment section


 
app.get('/gateway', function(req, res){ 
	res.render('gateway', { 
	key: Publishable_Key 
	}) 
}) 

app.post('/payment', function(req, res){ 

	// Moreover you can take more details from user 
	// like Address, Name, etc from form 
	stripe.customers.create({ 
		email: req.body.stripeEmail, 
		source: req.body.stripeToken, 
		name: 'Gautam Sharma', 
		address: { 
			line1: 'TC 9/4 Old MES colony', 
			postal_code: '110092', 
			city: 'New Delhi', 
			state: 'Delhi', 
			country: 'India', 
		} 
	}) 
	.then((customer) => { 

		return stripe.charges.create({ 
			amount: 7000,	 // Charing Rs 25 
			description: 'Web Development Product', 
			currency: 'INR', 
			customer: customer.id 
		}); 
	}) 
	.then((charge) => { 
		res.send("Success") // If no error occurs 
	}) 
	.catch((err) => { 
		res.send(err)	 // If some error occurs 
	}); 
}) 




app.get("/movies/:_id",catchAysnc(async (req, res) => {
    const { _id } = req.params;
    // console.log(_id);
    const mov= await movieSchema.findById(_id);
    console.log(mov);
  
    
res.render('show',{mov});
  })
);
app.get(
  "/ott",
  catchAysnc(async (req, res) => {
    const ottData=await movieSchema.find({});
    res.render('ottpage',{ottData});
  })
);
app.get("/ott/:_id",catchAysnc(async (req, res) => {
    
    const { _id } = req.params;
    // console.log(_id);
    const s= await movieSchema.findById(_id);
    // console.l/og(mov);
    res.render('showott',{s});
    
  
    
  })
);
app.get("/search", async (req, res) => {
  res.render("search");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.post(
  "/register",
  catchAysnc(async (req, res) => {
    const { username, email, password, mobilenumber } = req.body;
    const newUser = new userSchema({ username, email, mobilenumber });
    // await newUser.save();
    const newU = await userSchema.register(newUser, password);
    console.log(newU);
    res.send("sent");
  })
);
app.get("/search", (req, res) => {
  // const {search}=req.body;
  console.log(req.body);
  res.send(req.body);
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login",passport.authenticate("local", {failureFlash: true,failureRedirect: "/login",}),
  async (req, res) => {
    req.flash('success', 'welcome!!');
    res.redirect("/movies");
  }
);

app.use("/logout",isLoggedIn,catchAysnc((req, res) => {
    req.logout();
    req.flash("success", "goodbye");
    res.redirect("/movies");
  })
);

app.get('/theotorlogin', catchAysnc(async (req,res)=>{
  res.render('theotorLogin');
}))

app.post('/theotorlogin',passport.authenticate("local", {failureFlash: true,failureRedirect: "/theotorlogin",}) ,catchAysnc( async (req,res)=>{
  req.flash('success','welcome admin');
}));

app.get('/theatrelogin', catchAysnc(async (req,res)=>{
  res.send('done')
}))
app.get("/:_id/bookings", isLoggedIn, (req, res) => {
  res.render("bookings");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 400));
  // res.send('404')
});

app.use((err, req, res, next) => {
  const { message = "something went wrong", statusCode = 500 } = err;
  res.status(statusCode).render("error", { err });
  // res.send('dhadha')
});
app.listen(3000, () => {
  console.log("Listening");
})
