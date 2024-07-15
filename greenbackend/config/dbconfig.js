// dbConfig.js

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/plantdatabase')
  .then(() => console.log('MongoDB connected locally'))
  .catch(err => console.error(err));

module.exports = mongoose;
