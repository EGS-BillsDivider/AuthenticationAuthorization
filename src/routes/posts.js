const router = require('express').Router();
const User = require('../model/user');
const verify = require('./verifytoken');

router.get('/verifyUser', verify, async (req, res) => {
    
    console.log("SUCCESSFULL");
    return res.status(200).json({
        message: 'Logged In Successfully',
    })
});

module.exports = router;