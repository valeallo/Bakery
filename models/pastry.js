const mongoose = require('mongoose');
// PUNTO 1 La pasticceria vende dolci che hanno un nome ed un prezzo. Ogni dolce è composto da
// una lista di ingredienti. Opzionale: indicare di ogni ingrediente quantità e unità di misura.
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