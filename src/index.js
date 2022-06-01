const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import routes
const authRoute = require('./routes/auth.js');
const postRoute = require('./routes/posts');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DOCKER_DB, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('connected to DB!'));

app.set('view-engine', 'ejs')

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false})); // para poder usar req.body.name quando escrever nos inputs da pag

app.get('/register', (req,res) => {
    res.render('register.ejs')
});

app.get('/login', (req,res) => {
    res.render('login.ejs')
});

//Route middleware
app.use('/', authRoute);
app.use('/posts', postRoute);


app.listen(3000, () => console.log("Server running!"));