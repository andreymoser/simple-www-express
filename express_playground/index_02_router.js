var express = require('express');
var app = express();
var port = 3000;

app.use('/app', require('./index_02/app'));

app.listen(port, () => {
  console.log(`express app listening on ${port}`);
});
