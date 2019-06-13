const passport = require('passport');
const Post = require('../../models/Post');
const PostValidator = require('../../validators/post');

module.exports = app => {
  app.post('/api/post', passport.authenticate('jwt', {
    session: false
  }), async (req, res, next) => {
    const {
      errors,
      isValid
    } = PostValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const {
      text,
      name,
      avatar
    } = req.body;
    const newPost = new Post({
      text,
      name,
      avatar,
      user: req.user.id
    });
    try {
      const createdPost = await newPost.save();
      return res.json(createdPost)
    } catch (error) {
      res.json(error);
    }
  })
}