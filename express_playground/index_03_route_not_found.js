var express = require('express');
var app = express();
var port = 3000;

app.get('*',(req, res, next) => {
  console.log(`hey!`);
  next();
});

app.get('/', (req, res) => {
  res.send('index');
});

app.get('/contact', (req, res) => {
  res.send('contact');
});

app.get('/cases', (req, res) => {
  res.send('cases');
});

app.get('/services', (req, res) => {
  res.send('services');
});

app.get('*',(req, res, next) => {
  console.log(`page not found!`);
  res.status(404);
  res.send('Sorry, page not found.');
});

app.listen(port, () => {
  console.log(`express app listening on ${port}`);
});
