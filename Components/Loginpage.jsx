import React from 'react';
import { useState } from 'react';
import { StyleSheet,Text, View, TextInput, Button } from 'react-native';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Here you can implement your login logic, for simplicity let's just check if fields are empty
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
    } else {
      // Implement your actual login logic here
      // For example, you might send an API request to authenticate the user
      console.log('Logging in...');
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <View >
      
        <Text>Username:</Text>
        <TextInput
        style={styles.input}
          type="text"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View>
        <Text>Password:</Text>
        <TextInput
        style={styles.input}
          type="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

export default LoginPage;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        borderWidth:1,
        borderColor:'#777',
        padding:8,
        margin:10,
        width:200
    }
    
});