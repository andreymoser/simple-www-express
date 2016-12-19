var express = require('express');
var app = express();
var port = 3000;

app.get('/', (req,res) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`express app listening on ${port}`);
});
