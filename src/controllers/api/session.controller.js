const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { User, Token } = require('../../models');
const { setTokenCookie } = require('../../utils/token.js');

const login = async (req, res, next) => {
    const { username, password } = req.body;
    console.log('++++++++++++++++++++++++++++', username, password)
    const user = await User.login({ credential: username, password });
    if (!user) {
        res.status(401).json({ message: 'Invalid Credentials' })
    }
    else {
        console.log('++++++++++++++++++++USER----------------,', user)
        const { accesstoken, refreshtoken } = await setTokenCookie(res, user);
        console.log('________________________________________', { accesstoken, refreshtoken })
        // res.json(user)
        res.json({ accesstoken, refreshtoken })
    }
}

// recall to delete refreshtokens from db
const { Op } = require('sequelize');
const logout = async (req, res) => {
    // tokens = tokens.filter(token => token !== req.body.token)
    await Token.destroy({ where: { token: { [Op.ne]: req.body.token } } });
    res.clearCookie('access-token');
    res.status(204).json({ message: 'success logout' })
}

const restoreSession = (req, res, next) => {
    const { user } = req;
    if (!user) {
        return res.json({});
    } else {
        return res.json({ user: user.toSafeObject() });
    }
}

// const tokens = require('../utils/tokensData.js');
const refreshTokens = async (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    const token = await Token.findOne({ where: { value: refreshToken } });
    if (!token) {
        console.log(token)
        return res.sendStatus(403)
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, null, async (err, jwtPayload) => {
        if (err) {
            console.error(err)
            return res.sendStatus(403)
        }
        const { user: { id, userName, email } } = jwtPayload;
        const user = await User.findOne({ where: { id, userName, email } });
        // const accessToken = generateAccessToken(user);
        const { accesstoken } = await setTokenCookie(res, user)
        return res.json({ accesstoken });
    })
}

module.exports = { login, logout, restoreSession, refreshTokens }
