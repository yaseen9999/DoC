import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform,Modal, ActivityIndicator,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { baseURL } from '../../config';
const OTPCODE = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [activeInput, setActiveInput] = useState(0);
    const [timer, setTimer] = useState(60);
    const [showResendText, setShowResendText] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const inputs = Array(4).fill(0).map(i => useRef(null));
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;
    useEffect(() => {
        inputs[0].current.focus();
    }, []);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(timer => timer - 1);
            }, 1000);
        } else {
            setShowResendText(false);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const Data = {
        email: email,
        otp: otp.join(''),
    };

    useEffect(() => {
        if (otp.every(value => value !== '')) {
            axios.post(`${baseURL}/verify-otp`, Data)
                .then((res) => {
                    console.log(res)
                    setModalVisible(false);
                    navigation.navigate('setnewpassword',{email:email});
                })
                .catch((error) => {
                    console.error(error);
                    setModalVisible(false);
                    Alert.alert("Please enter correct otp");
                });
        }
    }, [otp]);

    const handleInputChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value !== '') {
            if (index < 3) {
                setActiveInput(index + 1);
                inputs[index + 1].current.focus();
            }
        }
    };



    const handleFocus = (index) => {
        setActiveInput(index);
    };

    const handleBlur = () => {
        setActiveInput(-1);
    };

    const handleKeyPress = (event, index) => {
        if (event.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
            setActiveInput(index - 1);
            inputs[index - 1].current.focus();
        }
    };

    const handleResend = () => {
        // Reset timer and resend logic here
        setTimer(60);
        setShowResendText(true);
        // Additional logic for resending OTP code
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginTop: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.text1}>Enter OTP Code 🔐</Text>
                <Text style={styles.text2}>Please Check your email inbox for a message from IGT. Enter the one-time verification code below.</Text>
            </View>
            <View style={styles.otpcontainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        ref={inputs[index]}
                        key={index}
                        style={[
                            styles.box,
                            activeInput === index ? styles.activeInput : null
                        ]}
                        onChangeText={(value) => handleInputChange(index, value)}
                        onFocus={() => handleFocus(index)}
                        onBlur={handleBlur}
                        value={digit}
                        maxLength={1}
                        keyboardType="numeric"
                        onKeyPress={(event) => handleKeyPress(event, index)}
                        autoFocus={index === 0}
                    />
                ))}
            </View>
            <TouchableOpacity
                onPress={handleResend}
                disabled={showResendText}
                style={[styles.resendButton, { opacity: showResendText ? 0.5 : 1 }]}
            >
                <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>
            {showResendText && (
                <Text style={styles.timerText}>
                    You can resend the code in {timer} seconds.
                </Text>
            )}

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
                        <Text>Validating...</Text>
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
    otpcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginTop: 20,
    },
    box: {
        width: 70,
        height: 60,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    activeInput: {
        backgroundColor: '#ebf8f4',
        borderColor: '#38ba8b',
        borderWidth: 2,
    },
    resendButton: {
        marginTop: 20,
        backgroundColor: '#38ba8b',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
    },
    resendText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    timerText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'gray',
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

export default OTPCODE;
