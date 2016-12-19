let express = require('express');
let router = express.Router();
let Post = require('mongoose').model('Post');
module.exports = router;

//routing settings
router.get('/', (req, res) => {
  res.render('index', { title: 'XYZ Startup', message: 'XYZ - the largest lorem ipsum' });
});

router.get('/cases', (req, res) => {
  res.render('cases', { title: 'XYZ / Cases', message: 'Cases' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'XYZ / Contact', message: 'Contact' });
});

router.get('/services', (req, res) => {
  res.render('services', { title: 'XYZ / Services', message: 'Services' });
});

router.get('/jumbo', (req, res) => {
  res.render('index', { title: 'XYZ Startup', message: 'Jumbotron' });
});

router.get('/posts', (req, res) => {
  Post.find().limit(10).exec((err,data) => {
    if (err) {
      res.render('error', { title: 'XYZ / Posts', message: 'Posts not found' });
    } else {
      res.render('posts', { title: 'XYZ / Posts', message: 'Posts', posts: JSON.stringify(data) });
    }
  });
});

router.get('/posts/:year/:month/:title', (req, res) => {
  console.log(`/posts/${req.params.year}/${req.params.month}/${req.params.title}`);
  Post.find({
    url: `/posts/${req.params.year}/${req.params.month}/${req.params.title}`
  }).limit(1).exec((err,data) => {
    if (err || data.length < 1) {
      res.render('error', { title: 'XYZ / Posts', message: 'Post not found' });
    } else {
      res.render('post', { title: 'XYZ / Posts', message: 'Post', data: JSON.stringify(data[0]) });
    }
  });
});
