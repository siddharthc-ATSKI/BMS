
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();}
console.log(process.env.password);

 
const express = require("express");

const app = express();
const path = require("path");
const stripe = require("stripe")(process.env.Secret_Key);
const bodyparser = require("body-parser");
const { isLoggedIn,isAdmin } = require("./middleware");
const session = require("express-session");
const flash = require("connect-flash");
const mongoDB = require("./MongoDB/server");
const movieSchema = require("./models/movie");
const userSchema = require("./models/user");
const showSchema = require("./models/showDetails");
const ejsMate = require("ejs-mate");
const data2 = require("./seeds/data2");
const { v4: uuid, stringify } = require("uuid");
// const  data  = require("./seeds/rapidapi");

const request = require("request");
const passport = require("passport");
const passportLocal = require("passport-local");
const ExpressError = require("./utils/Expresserror");
const catchAysnc = require("./utils/catchAysnc");
// const collectottdata=require('./seeds/ottdata');
const axios = require("axios").default;
const options = require("./seeds/ottdata");
const theotorSchema = require("./models/theotor");
const { theotorLoginRoute } = require("./routes/theotorLogin");
const { loginRoutes } = require("./routes/loginroutes");
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

app.use((req, res, next) => {
  res.locals.currentUser = req.user;

  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", theotorLoginRoute);
app.use("/", loginRoutes);

app.get("/", async (req, res) => {
  res.render("firstview");
});

app.get(
  "/movies",
  catchAysnc(async (req, res) => {
    const data = await movieSchema.find({});
    // console.log(typeof(data));

    res.render("home", { data });
  })
);

//payment section
//app.get("/gateway", function (req, res) {
//  res.render("gateway", {
//    key: Publishable_Key,
//  });
//});
//
//app.post("/payment", function (req, res) {
//  // Moreover you can take more details from user
//  // like Address, Name, etc from form
//  stripe.customers
//    .create({
//      email: req.body.stripeEmail,
//      source: req.body.stripeToken,
//      name: "Gautam Sharma",
//      address: {
//        line1: "TC 9/4 Old MES colony",
//        postal_code: "110092",
//        city: "New Delhi",
//        state: "Delhi",
//        country: "India",
//      },
//    })
//    .then((customer) => {
//      return stripe.charges.create({
//        amount: 7000, // Charing Rs 25
//        description: "Web Development Product",
//        currency: "INR",
//        customer: customer.id,
//      });
//    })
//    .then((charge) => {
//      res.render("bookings")
//      res.send("Success"); // If no error occurs
//    })
//    .catch((err) => {
//      res.send(err); // If some error occurs
//    });
//});

app.get("/adminPage", isAdmin,async (req, res) => {
  const theotorData = await theotorSchema.find({});
  const movieData = await movieSchema.find({});
  res.render("adminpage", { theotorData, movieData });
});
app.post("/updatemovies", isAdmin,async (req, res) => {
  const { movie, theotor, timeSlot ,date} = req.body;
  console.log(date);
  // console.log(timeSlot);

  //  await newShow.save()

  const movied = await movieSchema.findById(movie);
  // await movied.shows.push({ timeSlot });
  await movied.shows.push({ theotor,timeSlot ,date});
  // console.log(movied.shows)
  // await movied.populate("shows");
  await movied.save();
  req.flash("success", "Successfully added");
  res.redirect("/adminpage");
});
app.get(
  "/movies/:_id",
  catchAysnc(async (req, res) => {
    const { _id } = req.params;
    // console.log(_id);
    const mov = await movieSchema.findById(_id);
    console.log(mov);

    res.render("show", { mov });
  })
);
app.get(
  "/ott",
  catchAysnc(async (req, res) => {
    const ottData = await movieSchema.find({});
    res.render("ottpage", { ottData });
  })
);
app.get(
  "/ott/:_id",isLoggedIn,
  catchAysnc(async (req, res) => {
    const { _id } = req.params;
    // console.log(_id);
    const s = await movieSchema.findById(_id);
    // console.l/og(mov);
    res.render("showott", { s });
  })
);

app.get("/ott/:_id/bookings",isLoggedIn,catchAysnc(async (req,res)=>{
  const { _id } = req.params;
  const s = await movieSchema.findById(_id);
res.render("ottpayments",{s,_id,key:(process.env.Publishable_Key),})
}));



app.post("/ott/:_id/bookings/payment",  function (req, res)  {
  // Moreover you can take more details from user
  // like Address, Name, etc from form
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "gg",
     
      address: {
        line1: "TC 9/4 Old MES colony",
        postal_code: "110092",
        city: "New Delhi",
        state: "Delhi",
        country: "India",
        
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 5000, // Charing Rs 50
        description: "BMS",
        currency: "INR",
        customer: customer.id,
      });
    })
    .then((charge) => {
      console.log(m);
      console.log(charge);
      
      res.render("showpage2");
      res.send("Success"); // If no error occurs
    })
    .catch((err) => {
      res.send(err); // If some error occurs
    });
});

//invoice
//const product = stripe.products.create({name: 'BMS'});
//const price =  stripe.prices.create({
//  product: '{{PRODUCT_ID}}',
//  unit_amount: 1000,
//  currency: 'INR',
//  recurring: {interval: 'month'},
//});
//
//const invoiceItem =  stripe.invoiceItems.create({
//  customer:customer.id,
//  price: 5,
//});
//const invoice = stripe.invoices.create({
//  customer: customer.id,
//  auto_advance: true, // Auto-finalize this draft after ~1 hour
//  collection_method: 'charge_automatically'
//});
//const invoice =  stripe.invoices.sendInvoice(
//  'in_18jwqyLlRB0eXbMtrUQ97YBw'
//);
//


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
    // console.log(newU);
    req.flash("success", "welcome!!");
    res.redirect("/movies");
  })
);
app.get("/search", (req, res) => {
  // const {search}=req.body;
  console.log(req.body);
  res.send(req.body);
});

app.get("/movies/:_id/bookings", isLoggedIn,async (req, res) => {
  const { _id } = req.params;
  const movie_data = await movieSchema.findById(_id).populate("shows.theotor");
 
//  console.log(movie_data.shows[0].theotor)
  res.render("selectslot",  {movie_data} );
  // res.send('connected')
});

app.get("/movies/:_id/bookings/:timeSlot/:date", isLoggedIn,async (req, res) => {
  const { _id, timeSlot,date } = req.params;
  const movieDATA = await movieSchema.findById(_id);
  res.render("bookings", { movieDATA, timeSlot ,date,key:process.env.Publishable_Key,});
});

app.post("/movies/:_id/bookings/:timeSlot/payment", function (req, res) {
  // Moreover you can take more details from user
  // like Address, Name, etc from form
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Gautam Sharma",
    
      address: {
        line1: "TC 9/4 Old MES colony",
        postal_code: "110092",
        city: "New Delhi",
        state: "Delhi",
        country: "India",
        
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 20000, // Charing Rs 25
        description: "BMS",
        currency: "INR",
        customer: customer.id,
      });
    })
    .then((charge) => {
      
res.render('showpage');      
      }).catch((err) => {
      res.send(err); // If some error occurs
  });
    });
  
const paymentIntent =  stripe.paymentIntents.create({
  amount: 1099,
  currency: 'INR',
  payment_method_types: ['card'],
  receipt_email: 'atharvaapkare@gmail.com',
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
});
