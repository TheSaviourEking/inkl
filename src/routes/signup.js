const express = require('express');
const router = express.Router();

const { renderSignupPage, signup } = require('../controllers/user.js');
router.get('/', renderSignupPage)
router.post('/', signup);

module.exports = router;
