const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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

app.use(express.static('public'));

if (!isProduction) {
    app.use(cors({ origin: /^(http:\/\/localhost)/, credentials: true, optionsSuccessStatus: 200 }));
}

// setting up helmet
// app.use(helmet)
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'lax',
            httpOnly: true
        },
        // cookieName: 'XSRF-TOKEN'
    })
);
// setting up session middleware 
const db = require('./models');
const store = new SequelizeStore({ db: db.sequelize, /*table: 'Sessions'*/ })
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


// delete when production
console.log({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && 'Lax',
        httpOnly: true
    }
});

app.use('/', require('./routes/index.js'));
// Errors
// app.use(resourceNotFound);
// app.use(sequelizeError);
// app.use(errorFormatter);

module.exports = app;
