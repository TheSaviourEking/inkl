const createError = require('http-errors')
const { User } = require('../../models');
const { setTokenCookie, clearCookie } = require('../../utils/token.js');

const login = async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.login({ credential: username, password });
    if (!user) {
        res.status(401).json({ message: 'Invalid Credentials' })
    }
    else {
        setTokenCookie(res, user);
        res.json(user)
    }
}

const logout = async (req, res) => {
    clearCookie(res, 'token');
    res.json({ message: 'success logout' })
}

const restoreSession = (req, res, next) => {
    const { user } = req;
    if (!user) {
        return res.json({});
    } else {
        return res.json({ user: user.toSafeObject() });
    }
}

module.exports = { login, logout, restoreSession }
