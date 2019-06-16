const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Auth model
const Auth = require('../../models/Auth');

// @route GET api/auth/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Auth works" }));

// @route GET api/auth/register
// @desc Register authorized user
// @access Public
router.post('/register', (req, res) => {
  Auth.findOne({ email: req.body.email })
    .then(auth => {
      if (auth) {
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        const newAuth = new Auth({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAuth.password, salt, (err, hash) => {
            if (err) throw err;
            newAuth.password = hash;
            newAuth.save()
              .then(user => res.json(auth))
              .catch(err => console.log(err));

          })
        })
      }
    })
});

// @route GET api/auth/login
// @desc Login authorized user / Returning JWT token
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  Auth.findOne({ email })
    .then(auth => {
      // Check for the user
      if (!auth) {
        return res.status(404).json({ email: 'Authorized user not found' });
      }

      // Check password
      bcrypt.compare(password, auth.password)
        .then(isMatch => {
          if (isMatch) {
            // User matched

            // Create JWT payload
            const payload = { id: auth.id, name: auth.name }

            // Sign token --> payload, send secret/key
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.status(400).json({ password: 'Password incorrect' });
          }
        });
    });
});

// @route GET api/auth/current
// @desc Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  });

module.exports = router;