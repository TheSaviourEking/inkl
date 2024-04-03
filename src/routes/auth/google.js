const express = require('express');
const router = express.Router();

router.get('/oauth2/redirect', require('../../controllers/auth/google.controller.js'));

module.exports = router;
