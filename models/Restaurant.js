const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  restaurant_id: String,
  name: String,
  location: {
    address: String,
    locality: String,
    city: String,
    latitude: String,
    longitude: String
  },
  cousines: String,
  price_rang: Number,
  thumb: String,
  user_rating: {
    aggregate_rating: String,
    rating_text: String
  },
  opinions: [
    {
      opinion_content: String,
      user_id: String,
      user_name: String
    }
  ]
});

mongoose.model('restaurants', restaurantSchema);
