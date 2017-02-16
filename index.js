const logger = require('./logger');
const config = require('./modules/config');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const mongod = require('./modules/mongod');
//schemas definition
const mongoose = require('mongoose');
require('./models/post');
require('./models/user');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('./modules/passport');


//force html enter and avoid bootstrap form input issues
app.locals.pretty = true;

//template engine settings
app.set('view engine', 'pug');

//middleware settings
app.use('*', logger);

app.use('/', express.static(path.join(__dirname,'/public')));
app.use('/', express.static(path.join(__dirname,'/bower_components/bootstrap/dist')));
app.use('/js', express.static(path.join(__dirname,'/bower_components/jquery/dist')));
app.use('/css/trumbowyg', express.static(path.join(__dirname,'/bower_components/trumbowyg/dist/ui')));
app.use('/js/trumbowyg', express.static(path.join(__dirname,'/bower_components/trumbowyg/dist')));

//xyp_app router
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//passport config
app.use(passport.initialize());
passport.setup(config);

app.use('/api',require('./api_router'));
app.use('/',require('./app_router'));

//page not found middleware
app.get('*',(req, res, next) => {
  console.log(`page not found!`);
  res.status(404);
  res.render('error',{ title: 'Error', message: 'Sorry, page not found.'});
});

mongod.connect(config.mongod.url, mongoose, (err,data) => {
  if (err) throw err;
  console.log(`mongod: ${data}`);
  app.listen(port, () => {
    console.log(`express app listening on ${port}`);
  });
});
