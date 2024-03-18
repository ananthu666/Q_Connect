import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './index'
function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          console.log("User signed in successfully");
          navigation.navigate("Dash");
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
        }
      }
    );


  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async() => {
    // Here you can implement your login logic, for simplicity let's just check if fields are empty
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
    } else {
      // Implement your actual login logic here
      // For example, you might send an API request to authenticate the user
      console.log('Logging in...');
      console.log("hi");
      try
      {
        const { data } = await supabase.auth.signInWithPassword({
          email: username,
          password: password,
        })
        if(data)
        alert("logged in");
    }
    catch(e)
            {
                console.log(e);
            }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{
        boxShadow: '2px 2px 15px  rgba(0, 0, 0, 0.3)',
        width: '430px',
        paddingHorizontal: '20px ',
        paddingBottom: '30px',
        paddingTop: '20px',
        
        backgroundColor: 'rgba(127,39,255,0.9)'
      }}>
        <View style={styles.content}>
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
                style={styles.passwordInput}
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
          <Button title="Login" onPress={handleLogin} />
          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
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
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 430, // Maximum width for the content
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // White color
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff', // White color
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff', // White color
    padding: 8,
    margin: 10,
    width: 200,
    color: '#fff', // White color
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 5,
    margin: 10,
    width: 200,
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
    marginRight: 1,
  },
  iconContainer: {
    marginLeft: 1,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  linksContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '210',
    justifyContent: 'space-between',
    // marginLeft: 70, // Remove marginLeft to center
  },
  link: {
    fontSize: 14,
    color: '#fff', // White color
    marginRight: 20,
    marginLeft: 20,
  },
});
