const express=require('express');
const app=express();
const path = require('path');

  // Set the default templating engine to ejs
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));


app.get('/',(req,res)=>{
    res.render('home');

})
app.get('/register',(req,res)=>{
      res.render('register');
})

app.get('/login',(req,res)=>{
  res.render('login');
})
app.listen(3000,()=>{
    console.log('Listening');
})