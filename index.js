const express=require('express');
const app=express();
const path = require('path');
const mongoDB=require('./MongoDB/server');

mongoDB();
  // Set the default templating engine to ejs
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.render('home');

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