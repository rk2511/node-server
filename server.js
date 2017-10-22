const express = require('express');
const hbs =  require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('View engine', 'hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `Current TS: ${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to write rec');
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('year', () => {
  return new Date().getFullYear();
});

app.get('/', (req,res) => {
res.render('home.hbs', {
  title: 'Welcome to home page',
  year: new Date().getFullYear(),
  welcome: 'Hi!! User'
});
});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    title: 'About this page',
    year: new Date().getFullYear()
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Some Error!'
  });
});
app.listen(3000);
