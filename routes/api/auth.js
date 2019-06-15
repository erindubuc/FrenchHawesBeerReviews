const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

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
// @access Private
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
            // Want to generate token
            res.json({ msg: 'Success' });
          } else {
            return res.status(400).json({ password: 'Password incorrect' });
          }
        });
    });
});

module.exports = router;