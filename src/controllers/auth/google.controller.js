const jwt = require('jsonwebtoken');
const getGoogleOauthTokens = require('../../utils/auth/google/getGoogleOauthTokens.js');
const getGoogleUser = require('../../utils/auth/google/getGoogleUser.js');
const { User } = require('../../models');
const { setTokenCookie } = require('../../utils/token.js');

const googleAuth = async (req, res) => {
    // get code from query string
    const code = req.query.code;
    try {
        // get id and access token from code
        const { id_token, access_token } = await getGoogleOauthTokens({ code });
        // get user with tokens
        const googleUser = await getGoogleUser(id_token, access_token);

        if (!googleUser.verified_email) {
            return res.status(404).send('email not verified');
        }
        // upsert user
        let user = await User.findOne({ where: { email: googleUser.email } });
        if (user) {
            user = await user.update({
                userName: googleUser.name,
                email: googleUser.email,
            })
        }
        // create sesssion
        if (user) {
            // If user found, create a session for the user
            req.session.user = { id: user.id, name: user.userName, email: user.email };
        }
        // set cookies
        await setTokenCookie(res, user);
        // redirect to client
        res.redirect('/')
    } catch (error) {
        res.redirect('http://localhost:8080/auth/error')
    }
}

module.exports = googleAuth;
