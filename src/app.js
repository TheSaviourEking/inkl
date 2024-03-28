const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const { environment } = require('./config');
// const { ValidationError } = require('sequelize');
const isProduction = environment === 'production' ? true : false;

// const bodyParser = require('body-parser');
// const parseForm = bodyParser.urlencoded({ extended: false })

// require('express-async-errors');
const { resourceNotFound, sequelizeError, errorFormatter } = require('./middleware/error.js');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// if (!isProduction) {
//     app.use(cors({ origin: 'http://127.0.0.1:8080', credentials: true, optionsSuccessStatus: 200 }));
//     app.options('*', cors({ origin: 'http://127.0.0.1:8080', credentials: true, optionsSuccessStatus: 200 }))
// }
if (!isProduction) {
    app.use(cors({ origin: 'http://127.0.0.1:8080', credentials: true, optionsSuccessStatus: 200 }));
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
        cookieName: 'XSRF-TOKEN'
    })
);
// setting up session middleware 
const db = require('./models');
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

const path = require('path');
app.use(express.static('public'));
// app.use(express.static('public', { dotfiles: 'ignore', redirect: false }))

// delete when production
console.log({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && 'Lax',
        httpOnly: true
    }
});
// console.log(csurf, '--------------------+++++++++++++++++=')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use((req, res, next) => {
//     res.locals.csrfToken = req.csrfToken();
//     console.log(res.locals.csrfToken)
//     next();
// });

app.use('/', require('./routes/homePage.js'));
app.use('/status', require('./routes/index.js'));

// Errors
app.use(resourceNotFound);
app.use(sequelizeError);
app.use(errorFormatter);

module.exports = app;
