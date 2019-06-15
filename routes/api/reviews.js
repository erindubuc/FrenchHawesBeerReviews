const express = require('express');
const router = express.Router();

// @route GET api/reviews/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Reviews works" }));

module.exports = router;