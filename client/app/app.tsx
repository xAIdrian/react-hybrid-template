import React from "react";
import { Platform } from "react-native";
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import Constants from 'expo-constants';

const APPLE_KEY = Constants.expoConfig?.extra?.revCatAppleKey;

export default class AppInitialization {
  
  static async kickoff(): Promise<void> {
    
    console.log('🚀 ~ file: app.tsx:13 ~ kickoff ~ ios', Purchases);
    await Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'ios') {
      await Purchases.configure({ apiKey: APPLE_KEY });
    }  else {
      console.log('bunk')
    }
  //   else if (Platform.OS === 'android') {
  //      Purchases.configure({apiKey: <revenuecat_project_google_api_key>});

  //     // OR: if building for Amazon, be sure to follow the installation instructions then:
  //      Purchases.configure({ apiKey: <revenuecat_project_amazon_api_key>, useAmazon: true });
  }
}
