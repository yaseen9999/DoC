import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator, Modal, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from '../firebaseConfig';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { baseURL } from '../config';

export default function Diagnose() {
  const [image, setImage] = useState('');
  const [disease, setDisease] = useState({});
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [responseModalVisible, setResponseModalVisible] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "Permission to access camera roll is required!");
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
      setUploadModalVisible(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      const metadata = {
        contentType: 'image/jpeg',
      };
      const storageRef = ref(storage, 'diagnoseImages/' + Date.now());
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
          setUploadModalVisible(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setImage(downloadURL);
            setUploadModalVisible(false);
          });
        }
      );
    } else {
      console.log('Image picking cancelled');
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert("No Image Selected", "Please select an image");
      return;
    }
    setResponseModalVisible(true);
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await axios.post(
        `${baseURL}/leafimage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setDisease(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setResponseModalVisible(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
      <Text style={styles.text1}>Welcome to Ai Doctor</Text>
      </View>
      <LottieView source={require('../animation/robot.json')} autoPlay loop style={{ width: 200, height: 200 }} />
      <TouchableOpacity style={styles.bt} onPress={pickImage}>
        <Text style={styles.authSignupText}>Select Image</Text>
      </TouchableOpacity>
      <View>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <TouchableOpacity style={styles.bt} onPress={handleSubmit}>
        <Text style={styles.authSignupText}>Done</Text>
      </TouchableOpacity>
      <ScrollView style={styles.diseaseScrollView}>
        <View style={styles.diseaseContainer}>
          {Object.keys(disease).map((key, index) => (
            <View key={index} style={styles.diseaseItem}>
              <Text style={styles.diseaseTitle}>{key}</Text>
              <Text style={styles.diseaseText}>{disease[key]}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={uploadModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Uploading Image...</Text>
            <ActivityIndicator size="large" color="#28B581" />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={responseModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Getting results...</Text>
            <ActivityIndicator size="large" color="#28B581" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  bt: {
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
  image: {
    width: 120,
    height: 160,
    marginBottom: 20,
  },
  text1: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  diseaseContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'flex-start',
  },
  diseaseItem: {
    marginBottom: 10,
  },
  diseaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  diseaseText: {
    fontSize: 16,
  },
  diseaseScrollView: {
    flex: 1,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 250,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
