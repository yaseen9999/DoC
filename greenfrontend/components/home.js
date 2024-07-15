import React, {useContext, useEffect,useState } from 'react';
import {ActivityIndicator, Button, TextInput, TouchableOpacity, ScrollView, Image, View, FlatList, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { baseURL } from '../config';
import { IdContext} from '../Idcontext';
const Home = () => {
  const {  userId } = useContext(IdContext);
 
  const [expandedItem, setExpandedItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [postId, setpostId] = useState('');
  const [expandedComments, setExpandedComments ]= useState('');
  const [replyText, setReplyText] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log(userId)
      const response = await axios.get(`${baseURL}/home`);
      console.log(response.data);
      const rawData = response.data;
      const extractedPosts = rawData.flatMap(item => item.posts);
      console.log(extractedPosts)
      setData(extractedPosts);
      //console.log(data)
    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //watcher for console data 
  useEffect(() => {
    console.log('Data state updated:', data);
    if(data.length>0){
      setLoading(false)
    }
  }, [data]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
       
        const response = await axios.get(`${baseURL}/fetchcomments/${postId}`);
        console.log(response)
        setComments(response.data.comments);
        setLoading(false);
        
      } catch (error) {
       
        setLoading(false);
      }
    };

    if (expandedComments === postId) {
      fetchComments();
    }
  }, [expandedComments, postId]);

  


  //watcher for console comments 
  useEffect(() => {
    console.log('Comment state updated:', comments);
    if(data.length>0){
      setLoading(false)
    }
  }, [comments]);
  const handleLike = async (postId) => {
    try {
        const updatedPosts = data.map(post => {
            if (post._id === postId) {
                const isLiked = likedPosts.has(postId);
                if (isLiked) {
                    post.likes -= 1; // Dislike if already liked
                    likedPosts.delete(postId);
                } else {
                    post.likes += 1; // Like if not liked
                    likedPosts.add(postId);
                }
            }
            return { ...post };
        });

        // Update the state after mapping through the data
        setData(updatedPosts);

        setLikedPosts(new Set(likedPosts)); 

        await axios.put(`${baseURL}/posts/${postId}/like`, { liked: likedPosts.has(postId) });

    } catch (error) {
        console.error("Error handling like:", error);
    }
  }
 const handlereply = (postId) => {
  if (expandedItem === postId) {
  
    setExpandedItem(null);
  } else {
    
    setExpandedItem(postId);
  }
};

const handleSubmitReply = async(postid) => {
  try {
    console.log(postid)
  
    const response = await axios.post(
      `${baseURL}/addcomment/${postid}`,
      { comment: replyText ,
        id:userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Reply submitted:', response.data);
    setExpandedItem(null);
  } catch (error) {
    console.error('Error submitting reply:', error);
  }

};
const commentsToggle = (postId) => {
  setpostId(postId);
  console.log(postId)
  if (expandedComments === postId) {
  
    setExpandedComments(null);
  } else {
    
    setExpandedComments(postId);
  }
};
const renderCommentItem = ({ item }) => (
  
  <View style={styles.itemContainer}>
    <View style={styles.separator} />
     <View style={styles.header}>
     <View>
    <Image source={{ uri: item.avataruri }} style={styles.avatar2} />
    </View>
   
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.text}>{item.comment}</Text>
    </View>
  </View>
  <View style={styles.separator} />
 </View>
   
);
const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.header}>
        <View >
        <Image source={{uri:item.avatar}} style={styles.avatar} />
        </View>
        <View style={styles.postContainer}>
        <Text style={styles.name}>{item.username}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.query, { flexWrap: 'wrap' }]}>{item.query}</Text> 
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.postIcons}>
        <TouchableOpacity onPress={() => handleLike(item._id)}>
        <Icon name="heart" size={20} color={likedPosts.has(item._id) ? 'red' : 'gray'} />
        
          <Text>{item.likes}</Text>
       </TouchableOpacity>


      
        <TouchableOpacity onPress={() => commentsToggle(item._id)} >
        <Icon name="comments" size={20} color={'gray'} />
       
        </TouchableOpacity>
     
        <View >
        <TouchableOpacity onPress={() => handlereply(item._id)}>
          <Icon  name="reply" size={20} color={'gray'} />
          
        </TouchableOpacity>
        </View>
         
       
        <Ionicons name="ellipsis-horizontal-circle" size={23} color={'gray'} />
        </View>
   
        </View>

      </View>
      { expandedItem===item._id&&(
        <View style={styles.replyContainer} >
          <TextInput
            style={[styles.replyInput,styles.input]}
            placeholder="Add your thoughts..."
            multiline
            value={replyText}
            onChangeText={setReplyText}
          />
          <View><TouchableOpacity onPress={()=>handleSubmitReply(item._id)}>
            <Icon name="paper-plane" size={20} color={'green'} />
          </TouchableOpacity></View>
          
        </View>
      )}
       { expandedComments===item._id&&(
          <View> 
            <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item._id}
          />
        </View>
          
        )}
        <View style={styles.separator} />
    </View>
);
  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
      <Image source={require('../assets/logo1.png')} style={styles.headerLogo}/>
      <Text style={styles.headerText} >Green Thumb</Text>
      <Icon  name="search" size={18} color={'black'} />
      </View>
      <View style={styles.line} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data.length > 0 ? (
        
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text style={styles.noPostsText}>No posts available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom:20,
  },
  header:{
  display:'flex',
  flexDirection:'row',
  width:'90%',

  },
  itemContainer: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 4,
    marginLeft:12,
    marginLeft:12,
  },

  postIcons:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:2,
    marginBottom:4,
  },

  homeHeader :{
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:30,
    marginLeft:10,
    marginRight:15,
    
  },

  headerLogo:{
    width: 40, 
    height: 40,
  },

  headerText:{
    fontSize:20,
    fontWeight:"500",

  },

  postContainer :{
    marginLeft:10,
    marginTop:1,
    width:'85%',
  },

  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginVertical: 3,
    opacity:0.3,
  },
  name:{
    fontSize:20,
    fontWeight:'500',
  },

  query: {
    fontSize: 16,
    color: 'black',
    flexWrap:'wrap',
    marginBottom:10,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: 120,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 35,
    marginTop:2,
    marginLeft:4,
  },
  commentIconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  commentItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentInput: {
    color: "black",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    marginTop: 5,
    marginBottom: 10,
    height: 100,
    width: '95%',

  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,

  },
  commentActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,

  },
  replyicon: {
    marginBottom: 5,
    marginLeft: 10,
  },
  hearticon: {

    marginLeft: 10,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1, // Add border to separate from likes and comments
    borderTopColor: 'lightgray', // Adjust as needed
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    
  },
  replyInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'lightgray', // Adjust as needed
    borderRadius: 5,
    padding: 5,

   
  },
  input: {
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#E8E8E8',
    height: 40,
    marginBottom: 10,
    height:140,
  
  },
  commentContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatar2: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 10,
  },
});

export default Home;