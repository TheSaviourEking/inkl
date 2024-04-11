const path = require('path');

const renderHomePage = (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.sendFile(path.resolve(__dirname, '..', 'views', 'index.html'))
}

const renderLoginPage = (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.sendFile(path.resolve(__dirname, '..', 'views', 'pages', 'login.html'))
}

const renderSignupPage = (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.sendFile(path.resolve(__dirname, '..', 'views', 'pages', 'signup.html'))
}

module.exports = { renderHomePage, renderLoginPage, renderSignupPage };
