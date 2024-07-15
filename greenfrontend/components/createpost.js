import React, { useEffect } from 'react'
import { Button, TextInput, TouchableOpacity, ScrollView, Image, View, FlatList, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Createpost = () => {
    const [plantName, setPlantName] = useState('');
    const [diseaseQuery, setDiseaseQuery] = useState('');
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
   
   
    const pickImage = async () => {
     
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  
    // Function to handle form submission
    const handleSubmit = async () => {
      console.log("Plant Name:", plantName);
      console.log("Disease Query:", diseaseQuery);
      console.log("Image URI:", image);
      
      const data = {
        name: plantName,
        query: diseaseQuery,
        image: image,
      };
    
      // Log the form data before hitting the API
      await axios.post('http://192.168.1.144:5001/createpost', data, {
        headers: {
          'Content-Type': 'application/json' // Corrected content type
        }
      })
    .then(response => {
        console.log("Data sent to the server successfully.");
        navigation.navigate('home');
      })
      .catch(error => {
        console.error('Error:', error.message); // Log the error message
      });
    };
      
    
  
    return (
      <View style={styles.container}>
        <Text style={styles.text1}>Add your post</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Plant Name"
          value={plantName}
          onChangeText={text => setPlantName(text)}
        />
         <TextInput
        style={[styles.input, styles.textArea]} // Apply textArea style
        multiline={true}
        numberOfLines={4}
        placeholder="Query about disease"
        value={diseaseQuery}
        onChangeText={text => setDiseaseQuery(text)}
      />
        <TouchableOpacity style={styles.bt} onPress={pickImage}>
        <Text style={styles.authSignupText}>Select Image </Text>
      </TouchableOpacity>
      <View>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      
      </View>
      <TouchableOpacity style={styles.bt} onPress={handleSubmit}>
        <Text style={styles.authSignupText}>Done </Text>
      </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
      marginBottom: 20,
    },
    input: {
        borderWidth: 2,
        borderColor: '#fafafa',
        borderRadius: 10,
      
        height: 60,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        color: 'black',
        paddingRight: 35, 
        marginBottom: 40,
        borderRadius: 25,
      
        marginVertical: 8,
        width: '98%',
      },
      text1: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'black',
      },
      textArea: {
        height: 100, // Adjust the height as needed
      },
     bt:{
      
            borderRadius: 25,
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center', 
            marginVertical: 8,
            width: '98%',
            flexDirection: 'row',
            backgroundColor: '#28B581'
          
     }
  });
 

export default Createpost
