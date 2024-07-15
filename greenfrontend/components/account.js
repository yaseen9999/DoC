import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { IdContext } from '../Idcontext';
import { baseURL } from '../config';
import axios from 'axios';
import storage from '../firebaseConfig'; 
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function Account() {
  const [user, setUser] = useState({ avatarUri: "", name: "", dob: "", email: "", gender: "" });
  const { userId } = useContext(IdContext);
  const [date, setDate] = useState(new Date());
  const [avatarURL, setAvatarURL] = useState(""); 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseURL}/useraccount/${userId}`);
        const userData = response.data;
        const userObject = {
          avatarUri: userData.details.avataruri,
          name: userData.details.name,
          dob: userData.details.dateOfBirth ? new Date(userData.details.dateOfBirth) : "",
          email: userData.email,
          gender: userData.details.Gender,
        };
        setUser(userObject);
        setAvatarURL(userObject.avatarUri);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        console.log("Permission to access camera roll is required!");
        return;
      }
  
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
      if (!pickerResult.cancelled && pickerResult.assets.length > 0) {
        const { uri } = pickerResult.assets[0];
  
        // Upload image to Firebase Storage
        const response = await fetch(uri);
        const blob = await response.blob();
        const metadata = {
          contentType: 'image/jpeg',
        };
        const storageRef = ref(storage, 'avatars/' + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
  
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            console.error('Error uploading image:', error);
          },
          () => {
            // Get download URL and update state
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              // Update the avatar URL in the component state
              setAvatarURL(downloadURL);
            });
          }
        );
      } else {
        console.log('Image picking cancelled');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  
  
  
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); 
    setDate(currentDate); 
    setUser(prevUser => ({
      ...prevUser,
      dob: currentDate 
    }));
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${baseURL}/userdetails`, {
        ...user,
        userId: userId,
        avatarUri: avatarURL, 
      });
      setEditable(false)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formattedDate = user.dob ? user.dob.toLocaleDateString() : "";



  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
      <TouchableOpacity onPress={pickImage} style={styles.container}>
        {user.avatarUri ? (
      <Image source={{ uri: user.avatarUri }} style={styles.avatar} />

        ) : (
          <View style={styles.placeholder} />
        )}
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={[styles.input, !editable && styles.disabledInput]}
          value={user.name}
          onChangeText={(text) => setUser(prevState => ({ ...prevState, name: text }))}
          placeholder="Enter your name"
          editable={editable}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Date of Birth:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, !editable && styles.disabledInput]}
            value={formattedDate}
            placeholder="Select Date of Birth"
            editable={false}
          />
          <TouchableOpacity style={styles.iconContainer} onPress={() => setShowDatePicker(true)}>
            <Icon name="calendar" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={[styles.input, !editable && styles.disabledInput]}
          value={user.email}
          editable={editable}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Gender:</Text>
        <TextInput
          style={[styles.input, !editable && styles.disabledInput]}
          value={user.gender}
          onChangeText={(text) => setUser(prevState => ({ ...prevState, gender: text }))}
          placeholder="Enter your gender"
          editable={editable}
        />
      </View>
      {!editable ? (
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  ImageContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 2,
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
    position: 'relative',
  },
  inputContainer: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  button: {
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    width: '98%',
    flexDirection: 'row',
    backgroundColor: '#28B581',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  placeholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 50,
  },
});
