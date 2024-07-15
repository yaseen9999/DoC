import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const PASSWORDSETSUCCESS = () => {
    const navigation = useNavigation();

    const handleSubmit = () => {
       navigation.navigate('Login')
    };

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.centered}>
                    <Image
                        source={require('../../assets/greentick.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.text1}>You're All Set! </Text>
                    <Text style={styles.text2}>Your password has been updated.</Text>
                </View>
            </View>
            <View>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.authButton} onPress={handleSubmit}>
                    <Text style={styles.authText}>Go to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 25,
        justifyContent: 'space-between'
    },
    wrapper: {
        justifyContent: 'center',
        flex: 1,
    },
    centered: {
        alignItems: 'center',
    },
    text1: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    text2: {
        fontSize: 14,
        marginTop: 10,
        color: 'gray',
        marginBottom: 20,
        textAlign: 'center'
    },
    separator: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
        opacity: 0.2,
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
    logo: {
        width: 100,
        height: 100,
    },
});

export default PASSWORDSETSUCCESS;
