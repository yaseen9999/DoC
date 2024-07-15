import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const StartPage = ({ navigation }) => {

  const handleGoogleSignIn = () => {
  };

  const handleFacebookSignIn = () => {
  };

  const handleAppleSignIn = () => {
  };


  const handleTwitterSignIn = () => {
 
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo1.png')} 
        style={styles.logo}
      />
      <View style={{marginBottom:'20px'}}>
        <Text style={styles.text1}>Let's Get Started!</Text>
        <Text style={styles.text2}>Let's dive into your account</Text>
      </View>
      <View style={styles.authButtonsContainer}>
 
        <TouchableOpacity style={styles.authButton} onPress={handleGoogleSignIn}>
          <Icon name="google" size={20} color="black" style={styles.icon} /> 
          <Text style={styles.authButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.authButton} onPress={handleFacebookSignIn}>
          <Icon name="facebook" size={20} color="black" style={styles.icon} /> 
          <Text style={styles.authButtonText}>Sign in with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.authButton} onPress={handleAppleSignIn}>
          <Icon name="apple" size={20} color="black" style={styles.icon} /> 
          <Text style={styles.authButtonText}>Sign in with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.authButton} onPress={handleTwitterSignIn}>
          <Icon name="twitter" size={20} color="black" style={styles.icon} /> 
          <Text style={styles.authButtonText}>Sign in with Twitter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.adjust}>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('signup')}>
          <Text style={styles.buttonText1}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText2}>Log in</Text>
        </TouchableOpacity>
      </View>
   
      <View style={styles.bottomText}>
      <Text style={styles.text3}>Privacy Policy</Text>
      <Text style={styles.text3}>Terms of Service</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text1: {
    fontSize: 30,
    marginTop: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  text2: {
    fontSize: 16,
    marginTop: 10,
    color: 'gray',
    textAlign: 'center',
  },
  authButtonsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  authButton: {
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    marginVertical: 5,
    width: 280,
    borderWidth: 0.2, 
    flexDirection: 'row', 
  },
  authButtonText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 40, 
  },
  button1: {
    backgroundColor: '#00a86b',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    width: 280,
  },
  button2: {
    backgroundColor: '#ebf8f3',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    width: 280,
    color: '#00a86b',
  },
  buttonText1: {
    color: 'white',
    fontSize: 16,
  },
  buttonText2: {
    color: 'green',
    fontSize: 16,
  },
  adjust: {
    marginTop: 20,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  icon: {
    marginRight: 10, 
  },
  bottomText:{
    display:'flex',
    flexDirection:'row',
    gap:20,
  },
  text3: {
    fontSize: 12,
    marginTop: 15,
    color: 'gray',
    textAlign: 'center',
    margin:"15px"
  },
});

export default StartPage;
