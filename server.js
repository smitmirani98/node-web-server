const express = require('express');
const hbs = require('hbs');
const fs=require('fs');
const port =process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req,res,next)=>{
  res.render('maintainence.hbs');
});
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now} : ${req.method} ${req.url}`;
  console.log(log);
   fs.appendFile('server.log',log + '\n',(err)=>{
  if(err){
    console.log('error occured');
  }
});
  next();
});
// app.use((req,res,next)=>{
//   res.render('maintainence.hbs');
// });
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
