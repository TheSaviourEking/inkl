const express = require('express');
const router = express.Router();

router.use('/google', require('./google.js'));
// router.use('/google', require('./google.js'));
// router.use('/google', require('./google.js'));

module.exports = router;
