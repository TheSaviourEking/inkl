const jwt = require('jsonwebtoken');
const { jwt: { secret, accessToken, refreshToken, expiresIn } } = require('../config/index.js');
const { User } = require('../models');

// const tokens = require('../utils/tokensData.js');
const { Token } = require('../models');

const setTokenCookie = async (res, user) => {
    // console.log(user, '++++++++++++++++++_________________')
    // const token = jwt.sign(
    //     { user: user.toSafeObject() },
    //     // secret,
    //     accessToken,
    //     { expiresIn: parseInt(expiresIn) }
    // );
    const accesstoken = generateAccessToken(user);
    const refreshtoken = generateRefreshToken(user);
    // tokens.push(refreshtoken);
    await Token.findOrCreate({ where: { value: refreshtoken } });

    const isProduction = process.env.NODE_ENV === 'production';
    // res.cookie('token', token, {
    //     httpOnly: isProduction,
    //     secure: isProduction,
    //     sameSite: isProduction && 'lax',
    //     maxAge: expiresIn
    // });
    res.cookie('access-token', accesstoken, {
        httpOnly: isProduction,
        secure: isProduction,
        sameSite: isProduction && 'lax',
        // maxAge: expiresIn
    });
    // return token;
    return { accesstoken, refreshtoken }
}

const generateAccessToken = (user) => {
    return jwt.sign(
        { user: user.toSafeObject() },
        accessToken,
        { expiresIn: '1m' }
        // { expiresin: parseInt(expiresIn) }
    )
}
const generateRefreshToken = (user) => {
    return jwt.sign(
        { user: user.toSafeObject() },
        refreshToken,
        //{ expiresIn: parseInt(expiresIn) }
        // don't put expiration on refresh tokens, it would be manually handled
    );
}

const authenticateTokenCookie = (req, res, next) => {
    // BEARER token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
    }
    return jwt.verify(token, accessToken, null, async (err, jwtPayload) => {
        // if (err) return next();
        // if (err) return res.sendStatus(403);
        if (err) {
            console.log(err);
            res.json({ err })
        }
        try {
            const id = jwtPayload.user.id;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (err) {
            res.clearCookie('access-token');
            return next();
        }
        if (!req.user) res.clearCookie('access-token')
        next();
    })
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
    // restoreUser,
    authenticateTokenCookie,
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

module.exports = { setTokenCookie, generateAccessToken, authenticateTokenCookie, clearCookie, restoreUser, requireAuth }
