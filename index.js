const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import routes
const authRoute = require('./routes/auth.js');
const postRoute = require('./routes/posts');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log('connected to DB!'));

//Middleware
app.use(express.json());
//Route middleware
app.use('/', authRoute);
app.use('/posts', postRoute);


app.listen(3000, () => console.log("Server running!"));