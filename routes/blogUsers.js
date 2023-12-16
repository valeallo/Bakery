const express = require("express");
const router = express.Router();
const blogUsers = require("../models/blog-users");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

router.get("/blog-users", async (req, res) => {
  try {
    const users = await blogUsers.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: "an error has occurred",
    });
  }
});

router.post("/blog-users", async (req, res) => {
  const salt = await Bcrypt.genSalt(10);
  const encryptedPassword = await Bcrypt.hash(req.body.password, salt);
  const newUser = new blogUsers({
    userName: req.body.userName,
    email: req.body.email,
    password: encryptedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
  });

  try {
    const saveUser = await newUser.save();
    res.status(200).send({
      message: "user saved successfully",
      payload: saveUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "an error has occurred",
      error: error,
    });
  }
});

router.delete("/blog-users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await blogUsers.findById(id).deleteOne();
    if (!user) {return res.status(404).send(`user with id ${id} not found`)}
    res.status(200).send(`user ${id} deleted successfully`);
  } catch (error) {
    res.status(500).send({
      message: "an error has occurred",
      error: error,
    });
  }
});

router.patch("/blog-users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = req.body;
    const options = { new: true };

    const result = await blogUsers.findByIdAndUpdate(id, updateUser, options);
    if (!result) {return res.status(404).send(`user with id ${id} not found`);}

    res.status(200).send({
      message: "user info updated successfully",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "an error has occurred",
      error: error,
    });
  }
});

router.post("/blog-users/login", async (req, res) => {
  const user = await blogUsers.findOne({ email: req.body.email })
  
  if (!user) {
    return res.status(404).send({
      message: "Email not found",
    });
  }
  const validPassword = await Bcrypt.compare(req.body.password, user.password); //confronta la password che mette l'utente con quella esistente
  if (!validPassword) {
    return res.status(404).send({
      message: "Wrong Password",
    });
  }
  const token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET, {expiresIn: '24h' })
  res.header('authorization', token).status(200).send({
    email: user.email,
    token: token
  })
  
  

  
});

module.exports = router;