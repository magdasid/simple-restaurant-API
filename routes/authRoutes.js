const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require( 'mongoose' );

module.exports = (app) => {
  app.get(
      '/auth/google',
      passport.authenticate('google', {
        scope: ['profile', 'email']
    })
  );
  app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google', session: false }), (req, res) => {
    const token = jwt.sign(JSON.stringify(req.user), '1234');
    res.redirect('OAuthLogin://login?user=' + token)
  });

  app.get('/api/current_user', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send(req.user);
  });
};
