const getGoogleOauthUrl = require('../utils/getGoogleAuth.js');

const renderHomePage = (req, res) => {
    // res.json('here')
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.render('pages/home')
}

const renderLoginPage = (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.render('pages/login', { _csrf: csrfToken, googleAuth: getGoogleOauthUrl() });
}

const renderSignupPage = (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.render('pages/signup', { _csrf: csrfToken })
}

module.exports = { renderHomePage, renderLoginPage, renderSignupPage };
