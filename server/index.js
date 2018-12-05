const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// call  definition of User model for db with mongoose
// & authorisation strategy with PassportJS.
require('./models/User');
require('./services/passport');

// simple database connection upon app startup using mongoose.
mongoose.connect(keys.mongoURI);

//define express app + cookies
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// start listening to authentication URLs via authRoutes.js
require('./routes/authRoutes')(app);

// use server port from .env file in production or default to 5000 for local dev.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
