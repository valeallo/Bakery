const express = require("express");
const router = express.Router();
const Pastry = require("../models/pastry");

router.get('/pastries', async (req, res) => {
    try {
      const pastries = await Pastry.find();
      res.json(pastries);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
  