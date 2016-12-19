var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('index');
});

router.get('/cases', (req, res) => {
  res.send('cases');
});

router.get('/contact', (req, res) => {
  res.send('contact');
});

router.get('/cases', (req, res) => {
  res.send('cases');
});

router.get('/services', (req, res) => {
  res.send('services');
});

module.exports = router;
