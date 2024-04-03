const express = require('express');
const router = express.Router();

const { login, logout, restoreSession } = require('../../controllers/api/session.controller.js');
const { restoreUser } = require('../../utils/token.js');

router.post('/', login);
router.delete('/', logout);
router.get('/', restoreUser, restoreSession)

module.exports = router;
