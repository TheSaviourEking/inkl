const jwt = require('jsonwebtoken');
const { jwt: { secret, expiresIn } } = require('../config/index.js');

const setTokenCookie = (res, user) => {
    const token = jwt.sign(
        { data: user },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie(
        'token',
        token,
        {
            maxAge: expiresIn * 1000,
            httpOnly: true, secure: isProduction,
            sameSite: isProduction && 'lax'
        })
}

const restoreUser = (req, res, next) => {
    const { token } = req.cookies;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next(err)
        }
    })
}
module.exports = { setTokenCookie, restoreUser };
