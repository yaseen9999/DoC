import React, { useContext,useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Modal,Alert } from 'react-native';
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import { baseURL } from '../config';
import { IdContext} from '../Idcontext';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const { userId, setUserId } = useContext(IdContext);
  const navigation = useNavigation();
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Please Fill All Fields");
      return;
    }
    setModalVisible(true);

    const loginData = {
      email: email,
      password: password,
    };
    axios.post(`${baseURL}/login`, loginData)
      .then((res) => {
      if (res){
          setModalVisible(false);
          navigation.navigate('homestack', { data: loginData }); 
          let id=res.data.userId;
          setUserId(id);

      }
         else {
          setModalVisible(false);
          Alert.alert(res.data.data); 
        }
      })
      .catch((error) => {
        console.log('Error details:', error);
        setModalVisible(false);
      });


  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleGoogleSignUp = () => {
  };

  const handleFacebookSignUp = () => {
  };

  const handleAppleSignUp = () => {
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.text1}>Welcome Back! 👋</Text>
        <Text style={styles.text2}>Let's Continue Your Green Journey</Text>
      </View>

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={13} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="gray"
        />
      </View>
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={15} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="gray"
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={15} color="black" style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.navigationLogin}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

          <CheckBox
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginTop: 8, marginRight: -5, marginLeft: -5 }}

          />

          <Text style={styles.text3}>Remember me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('forgetpassword')}>
          <Text style={styles.loginButton}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.text}>or</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.authButtonsContainer}>
        <TouchableOpacity style={styles.authButton} onPress={handleGoogleSignUp}>
          <Icon name="google" size={20} color="black" style={styles.icon} />
          <Text style={styles.authButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.authButton} onPress={handleFacebookSignUp}>
          <Icon name="facebook" size={20} color="black" style={styles.icon} />
          <Text style={styles.authButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.authButton} onPress={handleAppleSignUp}>
          <Icon name="apple" size={20} color="black" style={styles.icon} />
          <Text style={styles.authButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authSignupButton} onPress={handleLogin}>
          <Text style={styles.authSignupText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#28B581" />
            <Text>Log in...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 25,
  },
  input: {
    borderWidth: 2,
    borderColor: '#fafafa',
    borderRadius: 10,
    width: '90%',
    height: 35,
    backgroundColor: '#fafafa',
    borderRadius: 5,
    color: 'black',
    paddingRight: 35,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fafafa',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: -5,
    top: '50%',
    transform: [{ translateY: -25 }],
  },

  text1: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  text2: {
    fontSize: 16,
    marginTop: 10,
    color: 'gray',
    marginBottom: 20,
  },
  text3: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  navigationLogin: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  label: {
    color: "black",
    fontWeight: 'bold',
    marginBottom: 4,
  },
  loginButton: {
    color: '#28b581',
    marginLeft: 5,
    fontWeight: "bold",
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
    opacity: 0.5
  },
  text: {
    marginHorizontal: 10,
    color: 'gray',
  },
  authButtonsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  authButton: {
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginVertical: 8,
    width: '98%',
    borderWidth: 0.2,
    flexDirection: 'row',
  },
  authButtonText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 40,
    fontWeight: 'bold',
  },
  authSignupButton: {
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    width: '98%',
    flexDirection: 'row',
    backgroundColor: '#28B581'
  },

  authSignupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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

export default Login;
