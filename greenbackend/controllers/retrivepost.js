const userposts = require('../models/userposts');
const getposts = async (req, res) => {
    console.log('api get posts hit ')
    try {
      const data = await userposts.find();
      res.json(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  module.exports={getposts}