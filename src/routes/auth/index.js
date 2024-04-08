const express = require('express');
const router = express.Router();

router.use('/google', require('./google.js'));
router.use('/microsoft', require('./microsoft.js'));
// router.use('/google', require('./google.js'));
router.use('/error', require('./error.js'));

module.exports = router;
