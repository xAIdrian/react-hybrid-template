import { FontAwesome } from "@expo/vector-icons";
import { ThemeProvider, DarkTheme, DefaultTheme, useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import React from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";

export default function LoginScreen() {
  type StackParamList = {
    'login/signupscreen': undefined;
    '(tabs)': undefined;
  };
  
  type LoginScreenNavigationProp = StackNavigationProp<
    StackParamList,
    'login/signupscreen',
    '(tabs)'
  >;
  const colorScheme = useColorScheme();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // handle login logic here
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
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
        <Text style={{ marginTop: 16, textAlign: 'center' }} onPress={() => navigation.navigate('login/signupscreen')}>
          Don't have an account? Sign up
        </Text>
      </View>
    </ThemeProvider>
  );
};
