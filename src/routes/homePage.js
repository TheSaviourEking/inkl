const express = require('express');
const router = express.Router();

const path = require('path');
// const pages = path.join(__dirname, 'views', 'pages')
const pages = 'pages/';
/// LEARN
// router.route('/')
//     .get(empSController.getL)
//     .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), empSController.righr)

router.get('/', (req, res, next) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.render(pages + 'home', { token: csrfToken });
})

router.use('/login', require('./login.js'));
router.use('/signup', require('./signup.js'));
module.exports = router;
