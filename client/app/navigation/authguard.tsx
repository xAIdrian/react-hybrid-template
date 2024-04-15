import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../domain/authprovider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabLayout from '../views/(tabs)/_layout';
import LoginScreen from '../views/login/loginscreen';

const Stack = createStackNavigator();

const AuthGuard = ({ children }: { children: React.ReactElement }) => {
  const { user } = useAuth();

  if (user === null) {
    // User not authenticated, redirect to Login
    return <LoginScreen />;
  }

  return children;
};

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{ headerShown: false }}>
        {() => (
          <AuthGuard>
            <TabLayout />
          </AuthGuard>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);
