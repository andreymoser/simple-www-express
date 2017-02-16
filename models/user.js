const mongoose = require('mongoose');
const schema = new mongoose.Schema({
   name: String,
   username: {type: String, lowercase: true, trim: true, unique: true, required: true},
   password: {type: String, trim: true, required: true}
});
module.exports = mongoose.model('User',schema);
