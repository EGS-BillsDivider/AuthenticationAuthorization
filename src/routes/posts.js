const router = require('express').Router();
const User = require('../model/user');
const verify = require('./verifytoken');

router.get('/verifyUser', verify, async (req, res) => {
    
    res.json({
        message: 'Logged In Successfully',
    })
    res.status(200)
});

module.exports = router;