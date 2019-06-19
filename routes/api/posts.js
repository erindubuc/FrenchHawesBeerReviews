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

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Posts works" }));

// @route POST api/posts
// @desc Get latest current post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }), (req, res) => {
    // Get fields
    const postFields = {};
    postFields.user = req.user.id; // logged in user

    // check for handle
    if (req.body.handle) postFields.handle = req.body.handle;
    if (req.body.title) postFields.title = req.body.title;
    if (typeof req.body.tags !== 'undefined') {
      postFields.tags = req.body.tags.split(',');
    }
    if (req.body.post) postFields.post = req.body.post;
    if (req.body.date) postFields.date = req.body.date;

    BlogPost.findOne({ user: req.user.id })
      .then(post => {
        if (post) {
          // update post
          BlogPost.findOneAndUpdate(
            { user: req.user.id },
            { $set: postFields },
            { new: true }
          ).then(post => res.json(post));
        } else {
          // create post

          // check if handle exists
          BlogPost.findOne({ handle: postFields.handle })
            .then(post => {
              if (post) {
                errors.handle = 'That handle already exists';
                res.status(400).json(errors);
              }

              // save post
              new BlogPost(postFields).save().then(post => res.json(post));
            });
        }
      });
  });

module.exports = router;