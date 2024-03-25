const express = require('express');
const router = express.Router();

router.use('/login', require('./login.js'));
router.use('/signup', require('./signup.js'));

const path = require('path');
// const pages = path.join(__dirname, 'views', 'pages')
const pages = 'pages/';
router.get('/', (req, res, next) => {
    // console.log('here');
    // res.json({ message: 'here' });
    res.render(pages + 'index', { title: 'inkl' });
})
module.exports = router;
