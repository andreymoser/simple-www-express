let express = require('express');
let router = express.Router();
let Post = require('mongoose').model('Post');
let User = require('mongoose').model('User');
let jwt = require('jsonwebtoken');
let passport = require('passport');
let config = require('./modules/config');

module.exports = router;

function handleResponse(err, data, res) {
  if (err) {
    res.json(err);
  } else {
    res.json(data);
  }
}

router.post('/signup', (req, res) => {
  console.log('req.body: ');
  console.log(req.body);

  let newUser = new User({
      username: req.body.username,
      password: req.body.password
  });
  res.cookie('jwt', jwt.sign({username: req.body.username}, config.jsonwebtoken.secret, {
    expiresIn: '5 days'
  }));
  newUser.save(function(err) {
    handleResponse(err, {message: `user added`}, res);
  });
});

router.post('/auth', (req,res) => {
  console.log('api/auth', req.body);
  User.findOne({
    username: req.body.username
  }, (err,user) => {
    if (err || !user || req.body.password !== user.password) {
      if (err) console.error(err);
      return handleResponse(null, {
        success: false,
        message: 'auth failed, check user/password'
      }, res);
    }
    res.cookie('jwt', jwt.sign({username: req.body.username}, config.jsonwebtoken.secret, {
      expiresIn: '5 days'
    }));
    handleResponse(null, {
      success: true,
      message: 'authenticated successfully'
    }, res);
  });
});

router.post('/logout', (req, res) => {
  res.cookie('jwt','');
  handleResponse(null, {
    success: true,
    message: 'logged out successfully'
  }, res);
});

router.use((req,res,next) => {
  console.log('authenticating api...')
  passport.authenticate('jwt', {session: false}, function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    return next();
  })(req,res,next);
});

//routing settings
router.post('/posts', (req, res) => {
  var post = Post.create(req.body);
  post.save(post, (err) => handleResponse(err, post, res));
});

router.put('/posts', (req, res) => {
  var post = Post.create(req.body);
  post.update(post, (err) => handleResponse(err, post, res));
});

router.get('/posts/:id', (req, res) => {
  var post = { _id: req.params.id };
  Post.findOne(post, (err,data) => handleResponse(err, data, res));
});

router.get('/posts', (req, res) => {
  Post.find().limit(10).exec((err, data) => handleResponse(err, data, res));
});

router.delete('/posts/:id', (req, res) => {
  var post = { _id: req.params.id };
  Post.remove(post, (err,data) => {
    handleResponse(err, {message: `post ${req.params.id} deleted`}, res);
  });
});
