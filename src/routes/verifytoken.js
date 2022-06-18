const jwt = require('jsonwebtoken');

module.exports = function (req,res){

    const token = req.header('auth-token');

    if (!token) return res.status(403).send("Access Denied!");

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        return;
    }catch(err){
        return res.status(20103).json({
            message: "Invalid Token",
        })
    }
}