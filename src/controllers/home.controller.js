const getGoogleOauthUrl = require('../utils/auth/google/getGoogleAuth.js');
const path = require('path');

const renderHomePage = (req, res) => {
    // res.json('here')
    const cards = [
        "Never miss what's important",
        "Save Time, Read More",
        "Stay Informed",
        "Read with confidence"
    ];
    const newsCategories = ['tech', 'crypto', 'ai', 'jobs'];
    const news = ['']
    // req.user = true;
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.sendFile(path.resolve(__dirname, '..', 'views', 'pages', 'home.html'))
}

const renderLoginPage = (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    // res.render('pages/login', {
    //     _csrf: csrfToken,
    //     googleAuth: getGoogleOauthUrl(),
    //     // microsoftAuth: getMicrosoftOauthUrl(),
    // });
    res.sendFile(path.resolve(__dirname, '..', 'views', 'pages', 'login.html'))
}

const renderSignupPage = (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    // res.render('pages/signup', { _csrf: csrfToken })
    res.sendFile(path.resolve(__dirname, '..', 'views', 'pages', 'signup.html'))
}

module.exports = { renderHomePage, renderLoginPage, renderSignupPage };
