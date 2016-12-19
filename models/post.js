const mongoose = require('mongoose');
const schema = new mongoose.Schema({
   title: String,
   author: String,
   createDate: Date,
   content: String,
   url: String,
   tags: Array
});
schema.statics.create = (post) => {
  post.url = '/posts';
  if (post.createDate) post.url += `/${new Date(post.createDate).getFullYear()}/${new Date(post.createDate).getMonth() + 1}`;
  if (post.title) post.url += `/${post.title.replace(/[^A-Za-z0-9]+/g,' ').toLowerCase().trim().replace(/ +/g,'-')}`;
  return new module.exports(post);
};
module.exports = mongoose.model('Post',schema);
