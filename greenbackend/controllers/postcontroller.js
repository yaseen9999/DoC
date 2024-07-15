const userposts = require('../models/userposts');
const useraccounts = require('../models/useraccounts');
const posts = async (req, res) => {
    const { id,name, query, image } = req.body;
    const user = await useraccounts.findById(id);
  console.log(req.body);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
    const newPost = {
      avatar: user.details.avataruri,
      username: user.details.name,
      name: name,
      query: query,
      image: image
    };
  
    try {
      let userPosts = await userposts.findOne();
      
      if (!userPosts) {
        userPosts = new userposts();
      }
  
      userPosts.posts.push(newPost);
  await userPosts.save();
      
      console.log('New post saved:', newPost);
      
      res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }
  
  module.exports={posts}