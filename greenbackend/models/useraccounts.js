const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  otp: String,
  otpTimestamp: Date,
  details: {
    type: {
      avataruri: String,
      name: String,
      dateOfBirth: Date,
      email: String, 
      gender: String 
    },
   
    default: {
      avataruri: "",
      name: '',
      dateOfBirth: '',
      Email: '',
      Gender: ''
    }
  }
  
});

module.exports = mongoose.model('useraccounts', userSchema);
