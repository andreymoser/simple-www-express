var express = require('express');
var app = express();
var port = 3000;

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('index');
});

app.get('/cases', (req, res) => {
  res.send('cases');
});

app.get('/contact', (req, res) => {
  res.send('contact');
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
