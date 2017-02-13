(function(){
  const exports = module.exports = {};
  
  exports.connect = (url, mongoose, callback) => {
    exports.mongoose = mongoose;
    const db = mongoose.connection;
    db.on('error', (err) => {
      console.error(err);
      return callback(err);
    });
    db.once('open', function() {
      return callback(null,`connected on ${url}`);
    });
    mongoose.connect(url);
  };
})();
