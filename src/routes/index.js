const express = require('express');
const router = express.Router();

router.use('/', require('./home.route.js'));
router.use('/api', require('./api/index.js'));
router.use('/auth', require('./auth/index.js'));
// router.use('/process', require('./session.route.js'));
// router.use();
// router.use();
// router.use();
// router.use();
// router.use();
// router.use();
// router.use();
// router.use();
// router.use();

module.exports = router;
