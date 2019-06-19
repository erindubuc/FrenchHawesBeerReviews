const mongoose = require('mongoose');

// Create Schema
const BlogPostSchema = new mongoose.Schema({
  /*
  user: {
    // Associate user by id
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  */
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