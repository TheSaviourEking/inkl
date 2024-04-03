const express = require('express');
const router = express.Router();

const { renderHomePage, renderLoginPage, renderSignupPage } = require('../controllers/home.controller.js');

router.get('/login', renderLoginPage);
router.get('/signup', renderSignupPage);
router.get('/', renderHomePage);

module.exports = router;
