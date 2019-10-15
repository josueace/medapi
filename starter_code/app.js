
const cors = require('cors');

require('dotenv').config();
const flash = require("connect-flash");
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const User = require("./models/user");

const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


mongoose.Promise = Promise;
  mongoose
    .connect('mongodb://heroku_jkg6vq0m:oqfnjus2a3d2q1kdru665gq4qg@ds329058.mlab.com:29058/heroku_jkg6vq0m', {})
    .then(() => {
      console.log('Connected to Mongo Db=project-bloggy!')
    }).catch(err => {
      console.error('Error connecting to mongo', err)
    });



const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Express View engine setup

 



// default value for title local
app.locals.title = 'Bloggy';



// app.js
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


app.use(flash());
passport.use(new LocalStrategy(
//  {
 ///   passReqToCallback: true
 // },
 //https://github.com/jaredhanson/passport/issues/421   
(username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));


app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/auth-routes");
app.use('/', authRoutes);

module.exports = app;
