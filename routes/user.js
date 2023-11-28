const express = require("express")
const router = express.Router()
const Users = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")





router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { password, ...userWithoutPassword } = user.toObject();
        
        res.status(200).json(userWithoutPassword);
    } catch (err) {
        res.status(500).json({ message: "An error has occurred", error: err.message });
    }
});







router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
        await user.remove();
        res.status(200).json({ message: `User ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: "An error has occurred", error: err.message });
    }
});




router.patch("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const options = { new: true };
        const result = await Users.findByIdAndUpdate(id, req.body, options);
        if (!result) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }

        res.status(200).json({
            message: "User info updated successfully",
            payload: result, 
        });
    } catch (error) {
        res.status(500).json({
            message: "An error has occurred",
            error: error.message,
        });
    }
});



  router.post('/register', [ 
    check('username', 'username is required')
        .trim()
        .exists()
        .isLength({ min: 3 })
        .withMessage('username must be at least 3 chars long'),
    check('email', 'email is required')
        .trim()
        .exists()
        .isEmail()
        .withMessage('invalid email address')
        .normalizeEmail(),
    check('password', 'password is required')
        .trim()
        .exists()
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 chars long')
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            role: req.body.role
        });

        const savedUser = await newUser.save();
        const userToReturn = { ...savedUser._doc };
        delete userToReturn.password;

        res.status(201).json({ 
            message: "User registered successfully",
            user: userToReturn
        });
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({
                message: 'Username or E-mail already exists'
            });
        } else {
            res.status(500).json({
                message: 'An error occurred during registration',
                error: err.message 
            });
        }
    }
});




router.post("/users/login", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).send("Invalid credentials");
        }

        const token = jwt.sign({ email: user.email, role: user.role, user_id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
        
        res.header('authorization', token).status(200).send({
            email: user.email,
            token: token,
            role: user.role,
            user_id: user._id
        });
    } catch (err) {
        res.status(500).json({ message: "An error has occurred", error: err });
    }
});





  
    
 

  


        
module.exports = router