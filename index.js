const express=require('express');
const app=express();
const path = require('path');
const mongoDB=require('./MongoDB/server');
const movieSchema=require('./models/movie');

mongoDB();
  // Set the default templating engine to ejs
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))

app.get('/',async(req,res)=>{
  const movies =await movieSchema.find({});

    res.render('home', {movies});

})
app.get('/register',(req,res)=>{
      res.render('register');
})
app.get('/search', (req,res)=>{
  // const {search}=req.body;
console.log(req.body);
res.send(req.body);
})
app.get('/login',(req,res)=>{
  res.render('login');
})
app.listen(3000,()=>{
    console.log('Listening');
})