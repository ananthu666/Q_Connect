import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Signup({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = () => {
        // Here you can implement your signup logic
        // For simplicity, let's just check if fields are empty and passwords match
        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields.');
        } else if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
        } else {
            // Implement your signup logic here
            console.log('Signing up...');
        }
    };

    return (
        <View style={styles.container}>
            <View style={{
                boxShadow: '2px 2px 15px  rgba(0, 0, 0, 0.3)',
                paddingHorizontal: '20px ',
                paddingBottom: '30px',
                paddingTop: '20px',
               // borderRadius: '10px',
                backgroundColor: 'rgba(127,39,255,0.9)'
            }}>
                <Text style={styles.title}>Signup</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter your username"
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
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        placeholderTextColor="#fff"
                        secureTextEntry
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password:</Text>
                    <TextInput
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm your password"
                        placeholderTextColor="#fff"
                        secureTextEntry
                    />
                </View>
                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <Button title="Signup" onPress={handleSignup} color="#FF8911" />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: 350
    },
    label: {
        fontSize: 16,
        marginRight: 10,
        color: '#fff',
    },
    input: {
        // borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        padding: 8,
        width: 200,
        color: '#fff',
    }, 
    error: {
        color: 'red',
        marginBottom: 10,
    },
    link: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
    },
});
