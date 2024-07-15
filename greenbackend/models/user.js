const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
  email: String,
  password: String,
  otp: String,
  otpTimestamp: Date,
  });

module.exports = mongoose.model('userinfo', userSchema);
