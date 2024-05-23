import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { axiosAuthRequest } from "../domain/helpers/axiosauthwrapper";
import BillingModalScreen from "../billing_modal";

type StackParamList = {
  '(signup)': undefined;
  '(login)': undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  StackParamList,
  '(signup)',
  '(login)'
>;

export default function HomeScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [popup, setPopup] = React.useState(false);

  useEffect(() => {
    //** */
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, justifyContent:'space-between' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Home</Text>
      <TouchableOpacity
        style={{ 
          backgroundColor: 'skyblue',
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
        }}
        onPress={() => setPopup(true)}
      >
        <Text style={{ color: 'white' }}>Pop Up</Text>
      </TouchableOpacity>
      {
        popup && (
          <BillingModalScreen />
        )
      }
    </View>
  );
};
