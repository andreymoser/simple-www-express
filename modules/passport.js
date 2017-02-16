(function() {
  'use strict'
  const passport = require('passport');
  const passportJwt = require('passport-jwt');
  const jwt = require('jsonwebtoken');
  const JwtStrategy = passportJwt.Strategy;
  const ExtractJwt = passportJwt.ExtractJwt;
  const User = require('mongoose').model('User');

  const exports = module.exports = {};

  function getJWTCookie(req) {
    console.log('gettting JWT cookie:',req.cookies);
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
  }

  function getOpts() {
    console.log('exports',exports);
    return {
      jwtFromRequest: ExtractJwt.fromExtractors([getJWTCookie]),
      secretOrKey: exports.config.jsonwebtoken.secret
    };
  }

  exports.initialize = () => {
    return passport.initialize();
  };

  exports.instance = () => {
    return passport;
  };

  exports.config = {};

  exports.authenticateUser = (req,res,callback) => {
    var token = getJWTCookie(req);
    if (!token) return callback(req,res,null);
    var decoded = jwt.verify(token, getOpts().secretOrKey);
    if (decoded) {
      User.findOne({
        username: decoded.username
      }, (err, user) => {
        if (err) return callback(req,res,null);
        return callback(req,res,user);
      });
    } else {
      callback(req,res,null);
    }
  };

  exports.getSimpleUser = (req) => {
    var token = getJWTCookie(req);
    if (!token) return null;
    var decoded = jwt.verify(token, getOpts().secretOrKey);
    if (decoded) {
      var user = { username: decoded.username };
      console.log('simple user',user)
      return user;
    } else {
      return null;
    }
  }

  exports.setup = (config) => {
    exports.config = config;
    passport.use(new JwtStrategy(getOpts(), (jwt_payload, done) => {
      User.findOne({
        username: jwt_payload.username
      }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }));
  };

})();
