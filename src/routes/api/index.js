const express = require('express');
const router = express.Router();

router.use('/users', require('./users.js'));
router.use('/session', require('./session.js'));
// router.use('/users', require('./users.js'));

module.exports = router;
