import React from "react";
import { Platform } from "react-native";
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import Constants from 'expo-constants';

const APPLE_KEY = Constants.expoConfig?.extra?.revCatAppleKey;

export default class AppInitialization extends React.Component {
  
  componentDidMount(): void {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'ios') {
       Purchases.configure({ apiKey: APPLE_KEY });
    } 
  //   else if (Platform.OS === 'android') {
  //      Purchases.configure({apiKey: <revenuecat_project_google_api_key>});

  //     // OR: if building for Amazon, be sure to follow the installation instructions then:
  //      Purchases.configure({ apiKey: <revenuecat_project_amazon_api_key>, useAmazon: true });
  }
}
