import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LottieView from 'lottie-react-native';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.uri);
        setSelectedImage(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <LottieView source={require('../animation/robot.json')} autoPlay loop style={{ width: 200, height: 200 }} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <Button title="Select Image" onPress={selectImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
});

export default UploadImage;
