const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  restaurant_id: String,
  name: String,
  location: {
    address: String,
    locality: String,
    city: String,
    type: { type: String },
    coordinates: []
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

restaurantSchema.index({ location: "2dsphere" });
mongoose.model('restaurants', restaurantSchema);
