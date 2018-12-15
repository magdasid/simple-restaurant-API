const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require( 'mongoose' );
const Restaurant = mongoose.model('restaurants');

module.exports = (app) => {
  // get all restaurants from database
  app.get('/api/Restaurant/getAll', (req, res) => {
    Restaurant.find()
    .then(data => {
      if(data.length === 0) {
        return res.status(404).json({
          message: 'Restaurants not found'
        })
      }
      res.status(200).json({
        restaurants: data
      })
    });
  });

  // get restaurant by name
  app.get('/api/Restaurant/getByName/:name', (req, res) => {
    const restaurantName = req.params.name;
    Restaurant.find({ name: {'$regex' : '.*' + restaurantName + '.*', '$options': 'i'  } })
    .then(data => {
      if(data.length === 0) {
        return res.status(404).json({
          message: `Restaurant ${restaurantName} not found`
        })
      }
      res.status(200).json({
        restaurants: data
      })
    });
  });

  // get restaurants by cuisine
  app.get('/api/Restaurant/getByCuisine/:cuisine', (req, res) => {
    const cuisineName = req.params.cuisine;
    Restaurant.find({ cuisines: {'$regex' : '.*' + cuisineName + '.*', '$options': 'i'  } })
    .then(data => {
      res.send(data);
    });
  });

  // get restaurant by id
  app.get('/api/Restaurant/getById/:id', (req, res) => {
    const id = req.params.id;
    Restaurant.find({ _id: id })
    .then(data => {
      if(data.length === 0) {
        return res.status(404).json({
          message: 'Restaurant not found'
        })
      }
      res.status(200).json({
        restaurants: data
      })
    });
  });

  app.get('/api/Restaurant/getByLocation/:id', (req, res) => {
    const id = req.params.id;
    Restaurant.find({ _id: id })
    .then(data => {
      if(data.length === 0) {
        return res.status(404).json({
          message: 'Restaurant not found'
        })
      }
      res.status(200).json({
        restaurants: data
      })
    });
  });

  app.post('/api/Restaurant/addOpinion', passport.authenticate('jwt', {session: false}), (req, res) => {
      Restaurant.findByIdAndUpdate(req.body.restaurantId,
        {
        $push: {
          opinions: {
            opinion_content: req.body.opinion,
            user_id: req.user._id,
            user_name: req.user.name
          }
        }
      }, function (err, product) {
        console.log(req.body);
          if (err) console.log(err);
          res.send('Opinion of restaurant added');
      });
  });
};
