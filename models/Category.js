const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  category_id: String,
  name: String,
  photo: String
});

mongoose.model('categories', categorySchema);
