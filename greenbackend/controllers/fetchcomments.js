const userposts = require('../models/userposts');

const getComments = async (req, res) => {
  try {
    console.log("api hit fetch comments ")
    const postId = req.params.id;
    console.log(postId)
    // Find the user post document that contains the post with the given ID
    const userPost = await userposts.findOne({ 'posts._id': postId });
    if (!userPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log(userPost)

    // Find the specific post within the posts array
    const post = userPost.posts.id(postId);
    console.log(post)
    if (!post) {
      return res.status(404).json({ message: 'Post not found within user posts' });
    }
    console.log(post.Comments)
    res.status(200).json({ comments: post.Comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getComments };
