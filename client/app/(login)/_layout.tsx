import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { Button, TextInput, View, Text, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { login } from "../domain/hooks/authhooks";

export default function LoginScreen() {
  type StackParamList = {
    '(signup)': undefined;
    '(home)': undefined;
  };
  
  type LoginScreenNavigationProp = StackNavigationProp<
    StackParamList,
    '(signup)',
    '(home)'
  >;
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    login({ username, password }).subscribe({
      next: () => {
          setLoading(false);
          navigation.navigate('(home)')
        },
        error: (error) => {
          setLoading(false);
          console.error('Error logging in:', error);
        }
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      {
        loading ? (
          <ActivityIndicator />
        ) : (
          <>    
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 16 }}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 16 }}
            />
            <Button title="Submit" onPress={handleLogin} />
            <Text style={{ marginTop: 16, textAlign: 'center' }} onPress={() => navigation.navigate('(signup)')}>
              Don't have an account? Sign up
            </Text>
          </>
        ) 
      }
    </View>
  );
};
