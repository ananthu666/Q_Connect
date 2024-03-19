import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

function DrSignup({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = () => {
        // Here you can implement your signup logic
        // For simplicity, let's just check if fields are empty
        if (!name || !email || !specialization || !hospitalName || !contactNumber) {
            setErrorMessage('Please fill in all fields.');
        } else {
            // Implement your signup logic here
            console.log('Signing up...');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Doctor Signup</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                        placeholderTextColor="#fff"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        placeholderTextColor="#fff"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Specialization:</Text>
                    <TextInput
                        style={styles.input}
                        value={specialization}
                        onChangeText={setSpecialization}
                        placeholder="Enter your specialization"
                        placeholderTextColor="#fff"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Hospital Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={hospitalName}
                        onChangeText={setHospitalName}
                        placeholder="Enter hospital name"
                        placeholderTextColor="#fff"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contact Number:</Text>
                    <TextInput
                        style={styles.input}
                        value={contactNumber}
                        onChangeText={setContactNumber}
                        placeholder="Enter your contact number"
                        placeholderTextColor="#fff"
                        keyboardType="phone-pad"
                    />
                </View>
                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                <View style={styles.buttonContainer}>
                    <Button title="Signup" onPress={handleSignup} color="#41C9E2" />
                </View>
                <View style={styles.loginLinkContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default DrSignup;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'rgba(127, 39, 255, 0.9)',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#fff',
    },
    input: {
        //borderWidth: 1,
        borderColor: 'none',
        borderRadius: 5,
        padding: 8,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    }, 
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
    },
    loginLinkContainer: {
        marginTop: 10,
        width: '100%',
    },
    link: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
    },
});
