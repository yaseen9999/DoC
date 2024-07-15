const userposts = require('../models/userposts');
const useraccounts = require('../models/useraccounts');
const addCommentToPost = async (req, res) => {
  try {
    console.log('API call received');
    const postId = req.params.id; 
    console.log('Post ID:', postId);
    const { id,comment } = req.body;
    console.log('Comment:', comment,"id is :",id);

    const user = await useraccounts.findById(id);
    console.log(user);
    const name=user.details.name;
    const avatar=user.details.avataruri;
    
    // Find the user post document that contains the post with the given ID
    const userPost = await userposts.findOne({ 'posts._id': postId });
    if (!userPost) {
      console.error('User post document not found');
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log(userPost)
    // Find the specific post within the posts array
    const post = userPost.posts.id(postId);
    if (!post) {
      console.error('Post not found within user posts');
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log(post)
   
    post.Comments.push({  username:name,avataruri:avatar,comment: comment});

    
    await userPost.save();

    res.status(200).json({ message: 'Comment added to successfully', post });
  } catch (error) {
    console.error('Error adding comment to post:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addCommentToPost };
