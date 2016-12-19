const mongoose = require('mongoose');
const schema = new mongoose.Schema({
   name: String,
   username: {type: String, lowercase: true, trim: true, unique: true},
   password: String
});
module.exports = mongoose.model('User',schema);
