const { User, Preference } = require('../../models');

const signup = async (req, res, next) => {
    const { email, username, password } = req.body;
    const user = await User.login({ credential: email ? email : username, password })
    if (user) {
        res.status(401).json({ message: 'This username is already taken' });
    }
    const newUser = await User.signup({ email, userName: username, password });
    if (newUser && typeof newUser === 'string') {
        // next(createError(401))
        const error = new Error(newUser);
        error.message = newUser;
        next(error)
    }
    res.json(newUser)
}

const profile = async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.scope('currentUser').findByPk(userId, {
        include: Preference
    })
    res.json(user)
}

module.exports = {
    signup, profile
}
