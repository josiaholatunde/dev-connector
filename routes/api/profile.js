const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const profileValidator = require('../../validators/profile');

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
      }).populate('user', ['name', 'avatar']);
      if (!userProfile) {
        errors.profile = 'No profile was found for this user';
        return res.status(404).json(errors);
      }
      return res.json(userProfile);
    } catch (error) {
      return res.status(404).json(error);
    }
  });

  //@route GET /api/profile
  //@desc logged in user profile
  //@access private 
  app.post('/api/profile', passport.authenticate('jwt', {
    session: false
  }), async (req, res, next) => {
    const profileFields = {};
    let errors = {};

    const result = profileValidator(req.body);
    if (!result.isValid) {
      return res.status(400).json(result.errors);
    }
    const {
      handle,
      website,
      location,
      company,
      status,
      skills,
      bio,
      githubUsername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;

    profileFields.user = req.user.id;

    if (handle) profileFields.handle = handle;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (company) profileFields.company = company;
    if (githubUsername) profileFields.githubUsername = githubUsername;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;

    if (typeof skills !== 'undefined') profileFields.skills = skills.split(',');

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });
      if (profile) {
        //update
        const updatedProfile = await Profile.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: profileFields
        }, {
          new: true
        });
        res.json(updatedProfile);
      } else {
        //Create profile
        const handleFromRepo = await Profile.findOne({
          handle
        });
        if (handleFromRepo) {
          errors.handle = 'This handle already exists';
          return res.status(400).json(errors);
        }
        const savedProfile = await new Profile(profileFields).save();
        return res.json(savedProfile);

      }
    } catch (error) {
      res.status(400).json({
        msg: `An error occurred while Creating profile \n ${error}`
      });
    }
  })
}