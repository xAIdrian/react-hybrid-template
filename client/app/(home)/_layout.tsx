import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { axiosAuthRequest } from "../domain/helpers/axiosauthwrapper";

export default function HomeScreen() {
  type StackParamList = {
    '(signup)': undefined;
    '(login)': undefined;
  };
  
  type LoginScreenNavigationProp = StackNavigationProp<
    StackParamList,
    '(signup)',
    '(login)'
  >;
  const navigation = useNavigation<LoginScreenNavigationProp>();

  // const [username, setUsername] = React.useState('');

  useEffect(() => {
    //** */
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Home</Text>
    </View>
  );
};
