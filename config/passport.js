const mongoose = require('mongoose'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  User = require('../models/User');

const opts = {};

opts.secretOrKey = process.env.JWT_SECRET;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();


module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, async (payload, done) => {
    console.log(payload);
    const userFromRepo = await User.findById(payload.id);
    if (!userFromRepo) {
      return done(null, false);
    }
    return done(null, userFromRepo);
  }))
}