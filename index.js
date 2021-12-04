if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const {isLoggedIn}=require('./middleware')
const session = require("express-session");
const flash = require("connect-flash");
const mongoDB = require("./MongoDB/server");
const movieSchema = require("./models/movie");
const userSchema = require("./models/user");
const ejsMate = require("ejs-mate");
const data2 = require("./seeds/data2");
const { v4: uuid } = require("uuid");
const { data } = require("./seeds/data");
const request = require("request");
const passport = require("passport");
const passportLocal = require("passport-local");
// const collectottdata=require('./seeds/ottdata');
const axios = require("axios").default;
const options = require("./seeds/ottdata");
const { authenticate } = require("passport");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoDB();
// Set the default templating engine to ejs
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
// app.get("/", async (req, res) => {
//   const movies = await movieSchema.find({});

//   res.render("home", { data2 });
// });

// app.get('/', async (req,res)=>{
//   axios.request(options).then(function (response) {
//    let movies=response.data.results;
//     res.render("home",{movies})
//   }).catch(function (error) {
//     console.error(error);
//   });
// })
app.get("/movies", async (req, res) => {
  axios
    .request(options)
    .then(function (response) {
      let movies = response.data.results;
      res.render("home", { movies });
    })
    .catch(function (error) {
      console.error(error);
    });
});
app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  var options = {
    method: "GET",
    url: "https://ott-details.p.rapidapi.com/gettitleDetails",
    params: { imdbid: id },
    headers: {
      "x-rapidapi-host": process.env.x_rapid_api_host,
      "x-rapidapi-key": process.env.x_rapid_api_key,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      //console.log(response.data);
      let mov = response.data;
      res.render("show", { mov });
    })
    .catch(function (error) {
      console.error(error);
    });
  //const ott=await response.data.results.findById(req.params)
});
app.get("/ott/:id", async (req, res) => {
  const { id } = req.params;
  var options = {
    method: "GET",
    url: "https://ott-details.p.rapidapi.com/gettitleDetails",
    params: { imdbid: id },
    headers: {
      "x-rapidapi-host": process.env.x_rapid_api_host,
      "x-rapidapi-key": process.env.x_rapid_api_key,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      //console.log(response.data);
      let s = response.data;
      res.render("showott", { s });
    })
    .catch(function (error) {
      console.error(error);
    });
  //const ott=await response.data.results.findById(req.params)
});
app.get("/search", async (req, res) => {
  res.render("search");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  const { username, email, password, mobilenumber } = req.body;
  const newUser = new userSchema({ username, email, mobilenumber });
  // await newUser.save();
  const newU = await userSchema.register(newUser, password);
  console.log(newU);
  res.send("sent");
});
app.get("/search", (req, res) => {
  // const {search}=req.body;
  console.log(req.body);
  res.send(req.body);
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.
    authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
  async (req,res) => {
    res.send('login');
  }
);
app.get("/ott", async (req, res) => {
  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      let d = response.data.results;
      // console.log(d);
      res.render("ottpage", { d });
    })
    .catch(function (error) {
      console.error(error);
      return;
    });
});

app.get("/:id/bookings", (req, res) => {
  res.render("bookings");
});
app.listen(3000, () => {
  console.log("Listening");
});
