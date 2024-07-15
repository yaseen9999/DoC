import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Button, Modal, ActivityIndicator } from 'react-native';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { baseURL } from '../../config';

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const handleSubmit = async () => {
        if (!email) {
            Alert.alert("Please write an email");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            Alert.alert("Invalid email format");
            return;
        }
        setModalVisible(true);
        const Data = {
            email: email.toLocaleLowerCase(),
            timestamp : Date.now(),
        };

        axios.post(`${baseURL}/send-otp`, Data)
            .then((res) => {  
                setModalVisible(false);
                navigation.navigate('optcode',{email:email});
            })
            .catch((error) => {
                setModalVisible(false);
                Alert.alert("Please enter correct email address");
            });
    };





    return (
        <View style={styles.container}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginTop: 15 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.text1}>Forget Your Password? 🔑</Text>
                    <Text style={styles.text2}>Enter the email address associated with your IGT account. We'll send you a one-time verification code to reset your password</Text>
                </View>

                <Text style={styles.label}>Your Registered Email</Text>
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

            </View>
            <View>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.authSignupButton} onPress={handleSubmit}>
                    <Text style={styles.authSignupText}>Send OTP Code</Text>
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
                        <Text>Sending...</Text>
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
        display: 'flex',
        justifyContent: 'space-between'
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
    input: {
        borderWidth: 2,
        borderColor: '#fafafa',
        borderRadius: 5,
        width: '96%',
        height: 40,
        backgroundColor: '#fafafa',
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
    label: {
        color: "black",
        fontWeight: 'bold',
        marginBottom: 6,
    },
    icon: {
        marginRight: 10,
    },


    separator: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
        opacity: 0.2,
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

export default ForgetPassword;
