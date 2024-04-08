const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: 'auth failed' })
})

module.exports = router;
