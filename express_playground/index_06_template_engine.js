var express = require('express');
var app = express();
var port = 3000;
//logger middleware
var logger = (req,res,next) => {
  console.log(`${new Date().toString()} => ${req.method} ${req.originalUrl}`);
  next();
};

//template engine settings
app.set('view engine', 'pug');

//middleware settings
app.use('*', logger);

app.use('/', express.static(__dirname + '/public'));

//routing settings
app.get('/', (req, res) => {
  res.render('index', { title: 'XYZ', message: 'XYZ' });
});

app.get('/cases', (req, res) => {
  res.render('index', { title: 'XYZ - Cases', message: 'Cases' });
});

app.get('/contact', (req, res) => {
  res.render('index', { title: 'XYZ - Contact', message: 'Contact' });
});

app.get('/services', (req, res) => {
  res.render('index', { title: 'XYZ - Services', message: 'Services' });
});

//page not found middleware
app.get('*',(req, res, next) => {
  console.log(`page not found!`);
  res.status(404);
  res.send('Sorry, page not found.');
});

app.listen(port, () => {
  console.log(`express app listening on ${port}`);
});
