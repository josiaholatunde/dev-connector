const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: {
    user: {
      type: String,
      ref: 'users'
    }
  },
  comments: [{
    user: {
      type: String,
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
    },
    date: {
      type: String,
      default: Date.now
    },
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);