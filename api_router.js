let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let Post = require('mongoose').model('Post');

module.exports = router;

router.use(bodyParser.json());

//routing settings
router.put('/posts', (req, res) => {
  var post = Post.create(req.body);
  post.save(post, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(post);
    }
  });
});

router.post('/posts', (req, res) => {
  var post = Post.create(req.body);
  post.update(post, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(post);
    }
  });
});

router.get('/posts/:id', (req, res) => {
  var post = { _id: req.params.id };
  Post.findOne(post, (err,data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

router.get('/posts', (req, res) => {
  Post.find().limit(10).exec((err,data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

router.delete('/posts/:id', (req, res) => {
  var post = { _id: req.params.id };
  Post.remove(post, (err,data) => {
    if (err) {
      res.json(err);
    } else {
      res.json({message: `post ${req.params.id} deleted`});
    }
  });
});
