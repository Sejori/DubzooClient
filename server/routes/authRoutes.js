// PassportJS authentication package
const passport = require('passport');

// module.exports arrow function allows this to be called from other files
// via a require statement followed by an argument (app). See index.js

module.exports = (app) => {
  // because app object is passed to function from index.js express does not
  // need to be required in this file.

  // standard express GET handlers with passport authentication initialisation
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.get('/auth/logout', (req,res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
}
