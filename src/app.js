const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const { environment } = require('./config');
const isProduction = environment === 'production' ? true : false;

// require('express-async-errors');
// const { resourceNotFound, sequelizeError, errorFormatter } = require('./middleware/error.js');
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


// if (!isProduction) {
//     app.use(cors({ origin: 'http://127.0.0.1:8080', credentials: true, optionsSuccessStatus: 200 }));
//     app.options('*', cors({ origin: 'http://127.0.0.1:8080', credentials: true, optionsSuccessStatus: 200 }))
// }
if (!isProduction) {
    app.use(cors({ origin: 'http://127.0.0.1:8080', credentials: true }));
    // app.use(cors({ origin: 'http://127.0.0.1:8080', credentials: true, optionsSuccessStatus: 200 }));
    // app.options('*', cors({ origin: 'http://127.0.0.1:8080', credentials: true, optionsSuccessStatus: 200 }))
}

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'lax',
            // sameSite: 'None',
            // maxAge: 60*60*1000,
            httpOnly: true
        },
        // cookieName: 'XSRF-TOKEN'
    })
);
// setting up session middleware 
const db = require('./models');
// const { passport } = require('passport');
const store = new SequelizeStore({ db: db.sequelize, /*table: 'Session'*/ })
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
        store,
        cookie: isProduction ? { secure: true } : false
    })
)
// create session table if it doesn't already exist
store.sync();

// app.use(passport.authenticate('session'));

// delete when production
console.log({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && 'Lax',
        httpOnly: true
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', require('./routes/index.js'));
// Errors
// app.use(resourceNotFound);
// app.use(sequelizeError);
// app.use(errorFormatter);

module.exports = app;
