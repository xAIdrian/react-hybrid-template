import { useNavigation,  } from "expo-router";
import React from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signUp } from "../domain/hooks/authhooks";

export default function SignUp() {
  type StackParamList = {
    '(login)': undefined;
  };
  
  type SignupScreenNavigationProp = StackNavigationProp<
    StackParamList,
    '(login)'
  >;
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignup = () => {
    signUp({ username, password });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
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
    </View>
  );
};
