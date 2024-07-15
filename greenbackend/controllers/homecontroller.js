const userposts = require('../models/userposts');

const home= async (req, res) => {
    try {
        const posts = await userposts.find(); 
        console.log(posts);// Fetch all user posts
        res.status(200).json(posts);
        
      } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
      }

  }
  module.exports={home}
       