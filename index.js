const express = require("express");
const app = express();
const path = require("path");
const {v4:uuid}=require('uuid');
const {data}=require('./seeds/data');


const mongoDB = require("./MongoDB/server");
const movieSchema = require("./models/movie");
const userSchema = require("./models/user");
const ejsMate = require("ejs-mate");
// const collectottdata=require('./seeds/ottdata');
const axios = require("axios").default;
const options=require('./seeds/ottdata');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoDB();
// Set the default templating engine to ejs
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  const movies = await movieSchema.find({});
  
  res.render("home", { movies });
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, email, password, mobilenumber } = req.body;
  const newUser=new userSchema({username,email,password,mobilenumber});
  await newUser.save();
  console.log(newUser);
  res.send("sent");
});
app.get("/search",async (req, res) => {
  res.render('search')
   
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get('/ott', async (req,res)=>{
  axios.request(options).then(function (response) {
    // console.log(response.data);
    let d=response.data.results;
    console.log(d);
    res.render('ottpage',{d});
  
}).catch(function (error) {
    console.error(error);
    return
});
})

app.get('/:id',async (req,res)=>{
  const{id}=req.params;
  const mov=await movieSchema.findById(req.params.id);
  res.render('show',{mov})
})
app.get('/:id/bookings',(req,res)=>{
 
  res.render('bookings')
})
app.listen(3000, () => {
  console.log("Listening");
});
