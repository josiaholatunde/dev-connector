const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

module.exports = app => {
  //@route GET /api/profile
  //@desc logged in user profile
  //@access private 
  app.get('/api/profile', passport.authenticate('jwt', {
    session: false
  }), (req, res, next) => {

  });
}