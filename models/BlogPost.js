const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create new Schema Model
const BlogPostSchema = new Schema({

  user: {
    // Associate user by id
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  title: {
    type: String,
    required: true,
    max: 40
  },
  tags: {
    type: [String]
  },
  post: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = BlogPost = mongoose.model('posts', BlogPostSchema);