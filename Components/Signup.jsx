import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import supabase from './supa_config';


function Signup({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async() => {
        // Here you can implement your signup logic
        // For simplicity, let's just check if fields are empty and passwords match
        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
        } else if (password !== confirmPassword) {
            alert('Passwords do not match.');
        } else {
            try
            {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
              })
            console.log(data);
            const { data: user, error: userError } = await supabase
            .from('user_table')
            .upsert({
                user_id: email,
                username: username,
                password: password,
                
            })

            if (user) {
                alert("User created successfully");
                navigation.push('Login');
              }
            }
            catch (e) {
                console.log(e);
              }
        }

    };
    const drSignup = () => {
        navigation.push('DrSignup');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
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
                <View style={styles.buttonContainer}>
                    <Button title="Signup" onPress={handleSignup} color="#FF8911" />
                </View>
                <View style={styles.loginLinkContainer}>
                    <TouchableOpacity onPress={() => navigation.push('Login')}>
                        <Text style={styles.link}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/*<View style={styles.drbtn}>
                <TouchableOpacity >
                    <Button title="Dr.Signup" onPress={drSignup} color="#C683D7" />
                </TouchableOpacity>
    </View>*/}
        </ScrollView>
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
        borderWidth: 1,
        borderColor: 'transparent',
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
    drbtn: {
        width: '90%',
        maxWidth: 400,
        marginTop: 20,
        borderRadius: 10,
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
