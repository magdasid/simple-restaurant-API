const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require( 'mongoose' );
const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/User/addFavouriteRestaurant', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOneAndUpdate(req.user._id, { $addToSet: { favouriteRestaurants: { _id: req.body._id } } }, function (err, product) {
        if (err) console.log(err);
        res.send('Favourite restaurant added');
    });
  });
};
