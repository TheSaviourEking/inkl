const express = require('express');
const router = express.Router();

const { signup, profile } = require('../../controllers/api/users.controller.js');
const { requireAuth } = require('../../utils/token.js');

router.get('/:id', requireAuth, profile)
router.post('/', signup);

module.exports = router;
