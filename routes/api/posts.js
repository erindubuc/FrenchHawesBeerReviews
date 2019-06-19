const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Models
const User = require('../../models/User');
const BlogPost = require('../../models/BlogPost');

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Posts works" }));

// @route GET api/posts
// @desc Get latest current post
// @access Private
router.get('/',
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    BlogPost.findOne({ user: req.user.id })
      .then(post => {
        if (!post) {
          errors.nopost = 'There is no current post';
          return res.status(404).json(errors);
        }
        res.json(post);
      })
      .catch(err => res.status(404).json(err));
  });

module.exports = router;