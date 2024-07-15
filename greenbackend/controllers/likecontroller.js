const userposts = require('../models/userposts');

const likes=async (req, res) => {
  try {
    const postId = req.params.id;
    const { liked } = req.body; // Expect a liked property in the request body

    const userPost = await userposts.findOne({ 'posts._id': postId });

    if (userPost) {
      const post = userPost.posts.id(postId);
      post.likes = liked ? post.likes + 1 : post.likes - 1;
      await userPost.save();
      res.status(200).json({ message: 'Like updated' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

module.exports = {likes};
