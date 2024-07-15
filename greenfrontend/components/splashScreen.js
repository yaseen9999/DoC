import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text } from 'react-native';
import imgLogo from "C:\Users\HP\Desktop\reactNative\IGT-Expo\IGT-FE\assets\logo.png"
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={imgLogo} 
        style={styles.logo}
      />
      <Text style={styles.label}>Intelligent Green Thumb</Text>
      <ActivityIndicator size="larger" color="#ffffff" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00a86b',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 300, 
    height: 300,
  },
  label: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',

  },
  loader: {
    marginTop: 80, 
  },
});

export default SplashScreen;
