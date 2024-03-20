import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity ,CommonActions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import supabase from './supa_config';

function LoginPage({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [us, setus] = useState([]);
  const fetchus = async () => {
    try {
        const { data, error } = await supabase.from('user_table').select('user_id');
        if (error) {
            console.error('Error fetching user:', error.message);
        } else {
            const usIds = data.map(item => item.user_id);
            setus(usIds);
        }
        }
    catch (error) {

        console.error('An unexpected error occurred:', error.message);
    }
    };

    useEffect(() => {
        fetchus();
    }, []);
  
    console.log(us);
  useEffect(() => {
    try {
      const authListener = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN") {
            console.log("User signed in successfully");
           // alert("logged in"); 
           navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Login' },
              ],
            })
          );
            navigation.navigate("Dash");
          }

        }
 
      );
      // Clean up the listener
    }
    catch (e) {
      console.log(e);
    }

  }, []);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    // Here you can implement your login logic, for simplicity let's just check if fields are empty
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
    } 
    else if (!us.includes(username)) {
      setErrorMessage('user not found');
      }
      else {
      try {
        const { data } = await supabase.auth.signInWithPassword({
          email: username,
          password: password,
        })
        
      }
      catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Welcome to our LGBTQ+ Community</Text>
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
          <Button title="Login" onPress={handleLogin} />
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.links, { backgroundColor: 'black' }]} >
            <Button title="Dr Login" color='#FF3EA5'  onPress={() => navigation.navigate('DrLogin')}/>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

export default LoginPage;

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
    backgroundColor: 'rgba(127,39,255,0.9)',
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
  passwordInput: {
    flex: 1,
    color: '#fff',
    padding: 8,
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
  links: {
    marginTop: 10,

  }
});
