const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    posts: [
      {
       avatar:String,
       username:String,
       
        name: String,
        query: String,
        image: String,
     
        likes: {
          type: Number,
          default: 0
        },
        Comments: {
          type: Array,
          default: []
        }
         
         
         
      }
    ]
  });

module.exports = mongoose.model('userposts', postSchema);
