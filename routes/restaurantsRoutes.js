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
    Restaurant.find({
      name: {
        '$regex' : '.*' + restaurantName + '.*',
        '$options': 'i'
      }
    })
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
    const cuisine = req.params.cuisine;
    Restaurant.find({
      cuisines: {
        $regex: '.*' + cuisine + '.*',
        $options: 'igm'
      }
    })
    .then(data => {
      res.send(data);
    });
  });

  // get restaurants by city
  app.get('/api/Restaurant/getByCity/:city', (req, res) => {
    const city = req.params.city;
    Restaurant.find({
      'location.city': city
    })
    .then(data => {
      res.send(data);
    });
  });

  //get by cuisine and city
  app.get('/api/Restaurant/getByCuisineAndCity/:cuisine&:city', (req, res) => {
    const cuisine = req.params.cuisine;
    const city = req.params.city;
    Restaurant.find({
      cuisines: {
        $regex: '.*' + cuisine + '.*',
        $options: 'igm'
      },
      'location.city': {
        $regex: '.*' + city + '.*',
        $options: 'igm'
      }
    })
    .then(data => {
      res.send(data);
    });
  });

  // get restaurant by id
  app.get('/api/Restaurant/getById/:id', (req, res) => {
    const id = req.params.id;
    Restaurant.find({
      _id: id
    })
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

  app.get('/api/Restaurant/getByLocation/:long&:latt', (req, res) => {
    const long = req.params.long;
    const latt = req.params.latt;
    Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [long, latt]
          },
          $maxDistance: 5000,
          $minDistance: 0
        }
      }
    }).then(data => {
      res.status(200).json({
        restaurants: data
      })
    });
  });

  // adding opinion of the restaurant by a logged user
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
