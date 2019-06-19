const express = require('express');
const router = express.Router();

// @route GET api/reviews/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Reviews works" }));


// @route GET api/reviews/latest
// @desc Gets videos
// @access Public
// GET https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=PLWyf969w5F1NXkYvhWwyakgRJxwGSp7gm&key={YOUR_API_KEY}
router.get('/');

// @route GET api/reviews/latest
// @desc Gets latest uploaded videos
// @access Public
//GET https://www.googleapis.com/youtube/v3/activities?part=contentDetails&channelId=UCmbVoLlJWAbgO6pDdu6AhIQ&key={YOUR_API_KEY}
router.get('/latest');
module.exports = router;