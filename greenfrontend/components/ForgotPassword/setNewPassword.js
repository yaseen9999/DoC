import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform, Alert, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { baseURL } from '../../config';

const NEWPASSWORDSET = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const Data = {
        email:email,
        password:password,
    }

    const handleSubmit = async () => {
        if(password!==confirmPassword ){
            return Alert.alert("Password does not match")
        }
        setModalVisible(true);
       

        axios.post(`${baseURL}/update-password`, Data)
        .then((res) => {
            console.log(res)
            setModalVisible(false);
            navigation.navigate('passwordsetsuccess');
        })
        .catch((error) => {
            console.error(error);
            setModalVisible(false);
            Alert.alert("Some Error! Please try again");
        });
    };
    return (
        <View style={styles.container}>
            <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginTop: 15 }}>
                <TouchableOpacity onPress={() => {navigation.goBack(); navigation.goBack();}}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.text1}>Secure your Account 🔒</Text>
                <Text style={styles.text2}>Almost there! Create a new password for your IGT account to keep it secure. Remember to choose a strong and unique password.</Text>
            </View>

            <Text style={styles.label}>New Password</Text>
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

            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={15} color="black" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor="gray"
                />
                <TouchableOpacity onPress={toggleShowPassword}>
                    <Icon name={showPassword ? 'eye' : 'eye-slash'} size={15} color="black" style={styles.eyeIcon} />
                </TouchableOpacity>
            </View>
            </View>
            <View>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.authButton} onPress={handleSubmit}>
                    <Text style={styles.authText}>Save New Password</Text>
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
                        <Text>Saving...</Text>
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
        display:'flex',
        justifyContent:'space-between'
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
        textAlign: 'left'
    },
    label: {
        color: "black",
        fontWeight: 'bold',
        marginBottom: 4,
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
    icon: {
        marginRight: 10,
    },
    eyeIcon: {
        position: 'absolute',
        right: -5,
        top: '50%',
        transform: [{ translateY: -25 }],
    },
    separator: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
        opacity:0.2,
      },

    authButton: {
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        width: '98%',
        flexDirection: 'row',
        backgroundColor: '#28B581'
    },

    authText: {
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

export default NEWPASSWORDSET;
