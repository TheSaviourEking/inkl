const express = require('express');
const router = express.Router();

const { login, logout, restoreSession, refreshTokens } = require('../../controllers/api/session.controller.js');
const { restoreUser, authenticateTokenCookie } = require('../../utils/token.js');

router.post('/token', refreshTokens)

router.post('/', login);
router.delete('/', logout);
// router.get('/', restoreUser, restoreSession)
router.get('/', authenticateTokenCookie, restoreSession)

module.exports = router;
