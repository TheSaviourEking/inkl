const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/user.js');
router.post('/', signup);

module.exports = router;
