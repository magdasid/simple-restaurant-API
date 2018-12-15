const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  favouriteRestaurants: [ { _id: String } ]
});

mongoose.model('users', userSchema);
