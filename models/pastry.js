const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String
  });


  const pastrySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    ingredients: [ingredientSchema],
    imageUrl: {
      type: String,
      required: false 
    },
    quantity: {
      type: Number,
      required: true
    }
  } ,{
    timestamps: true
});
  
  module.exports = mongoose.model('Pastry', pastrySchema);