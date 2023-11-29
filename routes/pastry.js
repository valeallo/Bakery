const express = require("express");
const router = express.Router();
const Pastry = require("../models/pastry");


router.get("/pastries", async (req, res) => {
  try {
      const pastries = await Pastry.find();
      const pricedPastries = pastries.map(pastry => {
          const price = calculatePrice(pastry);
          return price !== null ? { ...pastry.toObject(), price } : null;
      }).filter(pastry => pastry !== null); 

      res.json(pricedPastries);
  } catch (err) {
      res.status(500).send({ message: "An error occurred", error: err });
  }
});
  

  router.get('/pastries/:id', async (req, res) => {
    try {
      const pastry = await Pastry.findById(req.params.id);
      if (!pastry) return res.status(404).json({ message: 'Pastry not found' });
      res.json(pastry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  router.post('/pastries', async (req, res) => {
    const pastry = new Pastry({
      name: req.body.name,
      price: req.body.price,
      ingredients: req.body.ingredients
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
  

  router.delete('/pastries/:id', async (req, res) => {
    try {
      const pastry = await Pastry.findByIdAndDelete(req.params.id);
      if (!pastry) return res.status(404).json({ message: 'Pastry not found' });
      res.json({ message: 'Pastry deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



  function calculatePrice(pastry) {
    const ageInDays = Math.floor((Date.now() - new Date(pastry.createdAt).getTime()) / (1000 * 60 * 60 * 24));
    
    if (ageInDays === 0) {
        return pastry.price; 
    } else if (ageInDays === 1) {
        return pastry.price * 0.80;
    } else if (ageInDays === 2) {
        return pastry.price * 0.20; 
    } else {
        return null; 
    }
}



module.exports = router;
  