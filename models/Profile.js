const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  experiences: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  skills: [
    {
      type: String,
      required: true
    }
  ],

  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true
  },
  social: {
    youtube: {
      type: String,
      trim: true
    },
    facebook: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    instagram: {
      type: String,
      trim: true
    }
  },
  bio: {
    type: String
  },
  githubUsername: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
