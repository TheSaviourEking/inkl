const jwt = require('jsonwebtoken');
const { jwt: { secret, expiresIn } } = require('../config/index.js');
const { User } = require('../models');

const setTokenCookie = (res, user) => {
    // console.log(user, '++++++++++++++++++_________________')
    const token = jwt.sign(
        { user: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('token', token, {
        httpOnly: isProduction,
        secure: isProduction,
        sameSite: isProduction && 'lax',
        // maxAge: expiresIn
    });
    return token;
}

const clearCookie = (res, cookieName) => {
    // return res.cookie(cookieName, '');
    return res.clearCookie(cookieName);
}

const restoreUser = async (req, res, next) => {
    const { token } = req.cookies;
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }
        console.log(jwtPayload, '+++++++JWTPAYLOad+++++++++++++++++++++++++++++++++++++++++++++++++++++')
        try {
            const id = jwtPayload.user.id;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (err) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');
        return next();
    })
}

const requireAuth = [
    restoreUser,
    (req, res, next) => {
        if (req.user) return next();
        else {
            const error = new Error('Unauthorized');
            error.title = 'Unauthorized';
            error.errors = ['Unauthorized'],
                error.status = 401;

            return next(error)
        }
    }
]

module.exports = { setTokenCookie, clearCookie, restoreUser, requireAuth }
