const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  category_id: String,
  name: String,
  photo: String
});

categorySchema.index({ location: "2dsphere" });
mongoose.model('categories', categorySchema);
