// const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { setTokenCookie } = require('../utils/auth.js');

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.login({ credential: username, password });
    if (!user) {
        return res.status(401).json({ error: 'invalid username or password' });
    }

    setTokenCookie(res, user);
    res.json({ user, jwt: process.env.JWT_SECRET });
    // res.render('pages/home', { user, jwt: process.env.JWT_SECRET });
}

const signup = async (req, res, next) => {
    const { Op } = require('sequelize');
    const { firstname, lastname, email, username, password, role } = req.body;

    try {
        const user = await User.signup({ firstName: firstname, lastName: lastname, email, userName: username, password, role });
        if (typeof user === 'string') {
            res.status(500);
            if (user === 'userName exists') res.json({ error: 'userName exists' })
            else if (user === 'Email already exists') res.json({ error: 'Email already exists' });
        } else {
            setTokenCookie(res, user);
            res.json({ user });
        };
    } catch (err) {
        console.error('Error during user creation: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = { login, signup };
