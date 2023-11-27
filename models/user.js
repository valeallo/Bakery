const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }]
});

module.exports = mongoose.model('User', userSchema);