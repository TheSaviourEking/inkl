// const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { setTokenCookie } = require('../utils/auth.js');

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(401).json({ error: 'invalid username or password' });
    }

    setTokenCookie(res, user);
    res.json({ user, jwt: process.env.JWT_SECRET });
}

const signup = async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;

    const user = await User.create({ firstName: firstname, lastName: lastname, email, userName: username, password });
    if (!user) { throw new Error('didnt work') };

    setTokenCookie(res, user);
    res.json({ user })
}
module.exports = { login, signup };
// module.exports = {
//     // async login(req, res) {
//     //     const { username, password } = req.body;

//     //     // const user = await User.findOne({ where: username });

//     //     // if (!await User.validatePassword(user, password)) {
//     //     //     return res.status(401).json(
//     //     //         { error: 'Invalid username or password' }
//     //     //     )
//     //     // };

//     //     setTokenCookie(res, user);
//     //     console.log(res.cookie, 're++++++++++++++_--------')
//     //     res.json({ user });
//     // },

//     async logout(req, res) {
//         res.clearCookie('token');
//         return res.json({ message: 'success' });
//     }
// }
