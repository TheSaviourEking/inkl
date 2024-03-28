const express = require('express');
const router = express.Router();

// const { check } = require('express-validator');

const userloginController = require('../controllers/user.js');
router.get('/', userloginController.renderLoginPage);
router.post('/', userloginController.login)

module.exports = router;
