const express = require("express");
const router = express.Router();
const Pastry = require("../models/pastry");


router.get("/pastries", async (req, res) => {
  try {
    const pastries = await Pastry.find();
    const pricedPastries = pastries.map(pastry => {
      const pricing = calculatePrice(pastry);
      if (pricing) {
        return { ...pastry.toObject(), ...pricing };
      }
      return null; 
    }).filter(pastry => pastry !== null);

    res.json(pricedPastries);
  } catch (err) {
    res.status(500).send({ message: "An error occurred", error: err });
  }
});
  
router.get('/pastries/:id', async (req, res) => {
  try {
    const pastry = await Pastry.findById(req.params.id);
    if (!pastry) {
      return res.status(404).json({ message: 'Pastry not found' });
    }

    const pricing = calculatePrice(pastry);
    if (pricing) {
      res.json({ ...pastry.toObject(), ...pricing });
    } else {
      res.json(pastry.toObject());
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


  

  router.post('/pastries', async (req, res) => {
    const pastry = new Pastry({
      name: req.body.name,
      price: req.body.price,
      ingredients: req.body.ingredients,
      imageUrl: req.body.imageUrl,
      quantity: req.body.quantity
    });
  
    try {
      const newPastry = await pastry.save();
      res.status(201).json(newPastry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  router.put('/pastries/:id', async (req, res) => {
    try {
      const pastry = await Pastry.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!pastry) return res.status(404).json({ message: 'Pastry not found' });
      res.json(pastry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

 

  function calculatePrice(pastry) {
    const ageInDays = Math.floor((Date.now() - new Date(pastry.createdAt).getTime()) / (1000 * 60 * 60 * 24));
    let discountedRate = 1; 
    let discountRate = 0;
  
    if (ageInDays === 1) {
      discountedRate = 0.80;
      discontRate = 20;
    } else if (ageInDays === 2) {
      discountedRate = 0.20; 
      discountRate = 80;
    } else if (ageInDays >= 3) {
      return null; 
    }
  
    const discountedPrice = parseFloat((pastry.price * discountedRate).toFixed(2));
    return { 
      discountedPrice: discountedPrice, 
      discountRate: discountRate 
    };
  }


module.exports = router;
  