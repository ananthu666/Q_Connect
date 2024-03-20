import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import supabase from './supa_config';
import { NavigationContainer,CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function DrLogin({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const[doctor,setDoctor]=useState([]);

  const fetchDoctor = async () => {
    try {
        const { data, error } = await supabase.from('dr_table').select('dr_id');
        if (error) {
            console.error('Error fetching doctor:', error.message);
        } else {
            const doctorIds = data.map(item => item.dr_id);
            setDoctor(doctorIds);
        }
        }
    catch (error) {

        console.error('An unexpected error occurred:', error.message);
    }
    };

    useEffect(() => {
        fetchDoctor();
    }, []);
  console.log(doctor);

  useEffect(() => {
    try {
        
      const authListener = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN") {
            console.log("Doctor signed in successfully");
            alert("Doctor logged in");
            // clear stack
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'Login' }, // Assuming 'Login' is your main login screen
                  { name: 'DrLogin' },
                ],
              })
            );
              
            navigation.navigate("Dr_dash");
          }
        }
      ); 
      // Clean up the listener
      return () => authListener.data.unsubscribe();
    }
    catch (e) {
      console.log(e);
    }
  }, [navigation]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    // Here you can implement your login logic, for simplicity let's just check if fields are empty
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
    }
    else if (!doctor.includes(username)) {
        setErrorMessage('Doctor not found');
        } 
    else {
      try {
        const { data } = await supabase.auth.signInWithPassword({
          email: username,
          password: password,
        })
        //if (data)
          
        
      }
      catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Doctor Login</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            type="text"
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder="Username"
            placeholderTextColor="#fff" // White color
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <View style={[styles.passwordInputContainer, styles.inputContainer]}>
            <TextInput
              style={styles.input}
              type="password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderTextColor="#fff" // White color
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="#FF3EA5" />
          <TouchableOpacity onPress={() => navigation.navigate('DrSignup')}>
            <Text style={styles.link}>Doctor Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default DrLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#4B0082', // Indigo color
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent', // Transparent border
    borderRadius: 5,
    padding: 8,
    color: '#fff',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  link: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
});
