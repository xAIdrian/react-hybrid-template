import { useNavigation,  } from "expo-router";
import React, { useState } from 'react';
import { Button, TextInput, View, Text, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signUp } from "../domain/hooks/authhooks";

export default function SignUp() {
  type StackParamList = {
    '(login)': undefined;
    '(home)': undefined;
  };
  
  type SignupScreenNavigationProp = StackNavigationProp<
    StackParamList,
    '(login)',
    '(home)'
  >;
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    signUp({ username, password }).subscribe({
      next: () => {
        setLoading(false);
        navigation.navigate('(home)');
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
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sign Up</Text>
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
            <Button title="Sign Up" onPress={handleSignup} />
            <Text style={{ marginTop: 16, textAlign: 'center' }} onPress={() => navigation.navigate('(login)')}>
              Don't have an account? Log in
            </Text>
          </>
        )
      }
    </View>
  );
};
