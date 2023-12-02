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
      required: false,
      default: "https://images.pexels.com/photos/808923/pexels-photo-808923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    quantity: {
      type: Number,
      required: true
    }
  } ,{
    timestamps: true
});
  
  module.exports = mongoose.model('Pastry', pastrySchema);