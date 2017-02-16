let express = require('express');
let router = express.Router();
let Post = require('mongoose').model('Post');
let passport = require('./modules/passport');
let jwt = require('jsonwebtoken');

module.exports = router;

//routing settings
router.get('/', (req, res) => {
  passport.authenticateUser(req,res, (req2,res2,user) => {
    res2.render('index', { title: 'XYZ Startup', message: 'XYZ - the largest lorem ipsum', user: user });
  })
});

router.get('/cases', (req, res) => {
  passport.authenticateUser(req,res, (req2,res2,user) => {
    res2.render('cases', { title: 'XYZ / Cases', message: 'Cases', user: user });
  })
});

router.get('/contact', (req, res) => {
  passport.authenticateUser(req,res, (req2,res2,user) => {
    res2.render('contact', { title: 'XYZ / Contact', message: 'Contact', user: user });
  })
});

router.get('/services', (req, res) => {
  passport.authenticateUser(req,res, (req2,res2,user) => {
    res2.render('services', { title: 'XYZ / Services', message: 'Services', user: user });
  })
});

router.get('/jumbo', (req, res) => {
  passport.authenticateUser(req,res, (req2,res2,user) => {
    res2.render('index', { title: 'XYZ Startup', message: 'Jumbotron', user: user });
  })
});

router.use((req,res,next) => {
  console.log('authenticating protected pages...')
  passport.instance().authenticate('jwt', {session: false}, function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    return next();
  })(req,res,next);
});

router.get('/posts', (req, res) => {
  Post.find().limit(10).exec((err,data) => {
    if (err) {
      res.render('error', { title: 'XYZ / Posts', message: 'Posts not found', user: passport.getSimpleUser(req) });
    } else {
      res.render('posts', { title: 'XYZ / Posts', message: 'Posts', posts: JSON.stringify(data), user: passport.getSimpleUser(req) });
    }
  });
});

router.get('/posts/:year/:month/:title', (req, res) => {
  console.log(`/posts/${req.params.year}/${req.params.month}/${req.params.title}`);
  Post.find({
    url: `/posts/${req.params.year}/${req.params.month}/${req.params.title}`
  }).limit(1).exec((err,data) => {
    if (err || data.length < 1) {
      res.render('error', { title: 'XYZ / Posts', message: 'Post not found', user: passport.getSimpleUser(req)});
    } else {
      res.render('post', { title: 'XYZ / Posts', message: 'Post', data: JSON.stringify(data[0]), user: passport.getSimpleUser(req)});
    }
  });
});
