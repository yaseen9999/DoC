import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import Login from './components/login';
import Signup from './components/signup';
import Createpost from './components/createpost';
import UploadImage from './components/upload';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ForgetPassword from './components/ForgotPassword/forgetPassword';
import OTPCODE from './components/ForgotPassword/otpcode';
import NEWPASSWORDSET from './components/ForgotPassword/setNewPassword';
import PASSWORDSETSUCCESS from './components/ForgotPassword/passwordsetSuccess';
import SplashScreen from './components/splashScreen';
import StartPage from './components/startPage';
import Home from './components/home';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Diagnose from './components/diagnose';
import MyPlants from './components/myplants';
import { Image, StyleSheet } from 'react-native';
import Account from './components/account';
import { FontAwesome } from '@expo/vector-icons'; 
import { IdProvider } from './Idcontext';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CameraScreen = () => {
  return (
    <View style={{ flex: 1 }}>
  
    </View>
  );
};

const HomeStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="home"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Octicons name="home" size={24} color={'gray'} />
        ),
        headerShown: false
      }}
    />

    <Tab.Screen
      name="diagnose"
      component={Diagnose}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="shield-check-outline" size={24} color={'gray'} />
        ),
        headerShown: false
      }}
    />
    <Tab.Screen
      name="createpost"
      component={Createpost}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="plus" size={24} color={'gray'} />
        ),
        headerShown: false
      }}
    />

   

    
<Tab.Screen
      name="My Plants"
      component={MyPlants}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Image
          source={require('./components/pics/potted-plant.png')} 
          style={styles.bottomNavigationLogo}
        />
        ),
        headerShown: false
      }}
    />

    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-outline" size={28} color={'gray'} />
        ),
        headerShown: false
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setSplashVisible(false)
    }, 2000);
    }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <IdProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="startpage" component={StartPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="upload" component={UploadImage} />
        <Stack.Screen name="homestack" component={HomeStack} />
        <Stack.Screen name="forgetpassword" component={ForgetPassword} />
        <Stack.Screen name="optcode" component={OTPCODE} />
        <Stack.Screen name="setnewpassword" component={NEWPASSWORDSET} />
        <Stack.Screen name="passwordsetsuccess" component={PASSWORDSETSUCCESS} />
        <Stack.Screen name="createpost" component={Createpost} />
      </Stack.Navigator>
    </NavigationContainer>
    </IdProvider>
  );
};

const styles = StyleSheet.create({
  bottomNavigationLogo:{
    width:20,
    height:20,
  }
})
export default App;
