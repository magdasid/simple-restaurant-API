const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require( 'mongoose' );
const User = mongoose.model('users');
const Restaurant = mongoose.model('restaurants');
const ObjectId = require('mongodb').ObjectID;

module.exports = (app) => {
  app.post('/api/User/addFavouriteRestaurant', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log('dod user',req.user._id);
    User.findOneAndUpdate({'_id': ObjectId(req.user._id)}, { $addToSet: { favouriteRestaurants: { _id: req.body._id } } }, function (err, product) { 
      if (err) console.log(err);
        console.log('elo');
        res.send('Favourite restaurant added');
    });
  });
  app.get('/api/User/getFavouriteRestaurant', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOne({'_id': ObjectId(req.user._id)})
    .then(data => {
      let favouriteRestaurantsIds = data.favouriteRestaurants;
      Restaurant.find({
        _id: { 
          $in: favouriteRestaurantsIds
        }
      })
      .then(restaurants => {
        res.status(200).json({
          favourites: restaurants
        })
      });
    });
  });
};
