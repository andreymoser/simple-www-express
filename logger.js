var strftime = require('strftime');
module.exports = (req,res,next) => {
  console.log(`${strftime('%F %T',new Date())} => ${req.method} ${req.originalUrl}`);
  next();
};
