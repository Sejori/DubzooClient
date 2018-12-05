// This file defines the authorisation strategies used by PassportJS
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// PassportJS serialisation
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
});

passport.use(
  // note: this strategy can be called as just 'google', see authRoutes.js
  new GoogleStrategy(
    {
      // params sent in header
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/api/auth/google/callback',
      scope: ['profile', 'email'],
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if profile ID (googleID) is already assigned to a user.
      const existingUser = await User.findOne({ googleID: profile.id })
      if (existingUser) {
        // already exists
        return done(null, existingUser);
      }

      //doesn't already exist
      const user = await new User({
        googleID: profile.id,
        email: profile.email
      }).save()
      done(null, user);
    }
  )
);
