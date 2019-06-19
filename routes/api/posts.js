const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateBlogPostInput = require('../../validation/post');

// Load Models
const User = require('../../models/User');
const BlogPost = require('../../models/BlogPost');


// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Posts works" }));

// @route	GET api/posts
// @desc	Get posts
// @access	Public
router.get(
  '/',
  (req, res) => {
    BlogPost.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  });

// @route	GET api/posts/:id
// @desc	Get posts by id
// @access	Public
router.get(
  '/:id',
  (req, res) => {
    BlogPost.findById(req.params.id)
      .then(post => {
        if (post) {
          res.json(post);
        } else {
          res.status(404).json({ nopostfound: 'No post found with that ID' })
        }
      })
      .catch(err =>
        res.status(404).json({ nopostfound: 'No post found with that ID' })
      );
  });





/*
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
*/

// @route POST api/posts
// @desc Get latest current post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateBlogPostInput(req.body);

    // check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }

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
/*
// @route	GET api/posts/all
// @desc	Get all posts
// @access	Public
router.get('/all', (req, res) => {
  const errors = {};

  BlogPost.find()
    .populate('post', ['title', 'post'])
    .then(posts => {
      if (!posts) {
        errors.nopost = 'There are no posts';
        return res.status(404).json(errors);
      }

      res.json(posts);
    })
    .catch(err => res.status(404).json({ post: 'There are no posts' }));
});

// @route	GET api/posts/tags
// @desc	Get post by tags
// @access	Public
router.get('/posts/:tags', (req, res) => {
  const errors = {};

  BlogPost.findOne({ tags: req.params.tags })
    .then(post => {
      if (!post) {
        errors.nopost = 'There is no post with this tag';
        res.status(404).json(errors);
      }
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ post: 'There is no post with this tag' })
    );
});
*/
// @route	DELETE api/posts
// @desc	Delete posts
// @access	Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    BlogPost.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user._id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;