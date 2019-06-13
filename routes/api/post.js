const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const PostValidator = require('../../validators/post');

module.exports = app => {

  //@route GET /api/posts
  //@desc get all posts
  //@access public 
  app.get('/api/posts/:id', async (req, res, next) => {
    let errors = {};
    try {
      const postFromRepo = await Post.findOne({
        _id: req.params.id
      });
      if (!postFromRepo) {
        errors.postNotFound = `No post with the id of ${req.params.id} was found`;
        return res.status(404).json(errors);
      }
      return res.json(postFromRepo);
    } catch (error) {
      return res.status(404).json({
        postNotFound: `No post with the id of ${req.params.id} was found, ${error}`
      });
    }
  });
  app.get('/api/posts', async (req, res, next) => {
    let errors = {};
    try {
      const postsFromRepo = await Post.find({}).sort({
        date: -1
      });
      if (!postsFromRepo) {
        errors.notFound = 'No post was found';
        res.status(404).json(errors);
      }
      res.status(200).json(postsFromRepo);
    } catch (error) {
      res.status(404).json({
        notFound: 'No post was found'
      });
    }
  });

  app.delete('/api/posts/:id', passport.authenticate('jwt', {
    session: false
  }), async (req, res, next) => {
    let errors = {};
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        errors.postNotFound = `No post with the id of ${req.params.id} was found`;
        return res.status(404).json(errors);
      }
      if (post.user.toString() !== req.user.id) {
        errors.unauthorized = `Unauthorized user`;
        return res.status(401).json(errors);
      }
      await post.remove();
      return res.status(204).json({
        success: true
      });
    } catch (error) {
      res.status(404).json({
        postNotFound: `No post was found with the id of ${req.params.id}`
      });
    }
  });

  app.post('/api/posts/like/:id', passport.authenticate('jwt', {
    session: false
  }), async (req, res, next) => {
    let errors = {};
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });
      if (!profile) {
        errors.unauthorized = 'Please create a profile and post before attempting to unlike a post';
        return res.status(401).json(errors);
      }
      const post = await Post.findOne({
        _id: req.params.id
      });
      if (!post) {
        errors.postNotFound = `No post with the id of ${req.params.id} was found`;
        return res.status(404).json(errors);
      }
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({
          msg: 'You have liked this post before'
        });
      }

      const newLike = {
        user: req.user.id
      };
      post.likes.unshift(newLike);

      const savedPost = post.save();
      return res.status(200).json({
        success: 'Successfully liked post'
      });
    } catch (error) {
      return res.status(404).json(error);
    }

  });

  app.post('/api/posts', passport.authenticate('jwt', {
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
      return res.json(createdPost);
    } catch (error) {
      res.json(error);
    }
  });

};