(function(){
  const url = require('../modules/config').mongod.url;
  const exports = module.exports = {};

  exports.mongoose = require('mongoose');
  const db = exports.mongoose.connection;

  //schemas definition
  require('../models/post');
  require('../models/user');

  exports.connect = (callback) => {
    db.on('error', (err) => {
      console.error(err);
      return callback(err);
    });
    db.once('open', function() {
      return callback(null,`connected on ${url}`);
    });
    exports.mongoose.connect(url);
  };
})();
