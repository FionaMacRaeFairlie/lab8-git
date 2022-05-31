require('dotenv').config();
require('./auth/passport');

const express = require('express');
const app = express();

//const passport = require('passport');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended: false }));

const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use(cookieParser());
const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/guestbookRoutes');
const authRouter = require('./routes/authRoutes');

app.use('/', router);
app.use('/', authRouter);

app.listen(3001, () => {
    console.log('Server started on port 3001. Ctrl^c to quit.');
    })

