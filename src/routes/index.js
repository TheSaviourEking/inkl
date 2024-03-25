const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({ 'XSRF-TOKEN': csrfToken })
})

router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    // res.cookie('xhh', )
    res.send('Hello World!');
});

router.post('/test', function (req, res) {
    res.json({ request: req.body })
})

module.exports = router;
