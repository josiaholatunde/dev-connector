const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

module.exports = app => {
  //@route GET /api/profile
  //@desc logged in user profile
  //@access private 
  app.get('/api/profile', passport.authenticate('jwt', {
    session: false
  }), async (req, res, next) => {
    const {
      id
    } = req.user;
    let errors = {};
    //Load Users profile
    try {
      const userProfile = await Profile.findOne({
        user: id
      });
      if (!userProfile) {
        errors.profile = 'No profile was found for this user';
        return res.status(404).json(errors);
      }
      return res.json(userProfile);
    } catch (error) {
      return res.status(404).json(error);
    }

  });
}