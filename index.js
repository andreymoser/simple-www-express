let logger = require('./logger');
let express = require('express');
let app = express();
let port = 3000;
let mongod = require('./modules/mongod');

//force html enter and avoid bootstrap form input issues
app.locals.pretty = true;

//template engine settings
app.set('view engine', 'pug');

//middleware settings
app.use('*', logger);

app.use('/', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/bower_components/bootstrap/dist'));
app.use('/js', express.static(__dirname + '/bower_components/jquery/dist'));
app.use('/css/trumbowyg', express.static(__dirname + '/bower_components/trumbowyg/dist/ui'));
app.use('/js/trumbowyg', express.static(__dirname + '/bower_components/trumbowyg/dist'));

//xyp_app router
app.use('/',require('./app_router'))
app.use('/api',require('./api_router'))

//page not found middleware
app.get('*',(req, res, next) => {
  console.log(`page not found!`);
  res.status(404);
  res.render('error',{ title: 'Error', message: 'Sorry, page not found.'});
});

mongod.connect((err,data) => {
  if (err) throw err;
  console.log(`mongod: ${data}`);
  app.listen(port, () => {
    console.log(`express app listening on ${port}`);
  });
});
