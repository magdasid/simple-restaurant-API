const mongoose = require( 'mongoose' );
const Category = mongoose.model('categories');

module.exports = (app) => {
  app.get('/api/Category/getAll', (req, res) => {
    Category.find()
    .then(data => {
      if(data.length === 0) {
        return res.status(404).json({
          message: 'Categories not found'
        })
      }
      res.status(200).json({
        categories: data
      })
    });
  });
};