const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { environment } = require('./config');
const { ValidationError } = require('sequelize');
const isProduction = environment === 'production' ? true : false;

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public'), { dotfiles: 'ignore', redirect: false }));

app.use(session({
    secret: 'SECR',
    resave: false,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
if (!isProduction) app.use(cors());
// set up helmet
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

console.log({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && 'Lax',
        httpOnly: true
    }
});
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            httpOnly: true
        }
    })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/', require('./routes/homePage.js'));
app.use('/status', require('./routes/index.js'));

module.exports = app;
