const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../model/user.js');
const {registerValidation, loginValidation} = require('../validation.js')
const jwt = require('jsonwebtoken');


//REGISTER
router.post('/register', async (req, res) => {

    //Validate registration
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Check if user already exists
    const userexists = await User.findOne({email: req.body.email});
    if (userexists) return res.status(409).send('There is already an account with this email!');

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // user structure to send to DB
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        // res.send({user: user._id});
        res.status(200).send();
    }catch(err){
        res.status(400).send(err);
    }

    //req.get('/login');
});
//LOGIN
router.post('/login', async (req, res) => {
    
    //Validate login
    const {error} = loginValidation(req.body);
    if(error) return res.status(401).send(error.details[0].message);

    // Check if account doesnt exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).send('Email not found!');
    
    //Check if password is correct
    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if (!validpassword) return res.status(401).send('Password not matching!');


    //CREATE JWT TOKEN
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);


    // redirect to Webapp login endpoint
    var name = encodeURIComponent(user.name);
    var aux_token = encodeURIComponent(token);
    res.status(200).redirect("http://billsdivider.egs/login?name="+name+"&token="+aux_token)

});


// cloud.mongodb.com

module.exports = router;