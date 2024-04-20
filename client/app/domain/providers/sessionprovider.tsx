import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = 'access_token';

export async function saveAccessToken(token: string): Promise<void> {
  console.log('🚀 ~ file: sessionprovider.tsx:6 ~ saveAccessToken ~ saveAccessToken:', saveAccessToken);
  await AsyncStorage.setItem(ACCESS_TOKEN, token);
}

export async function getAccessToken(): Promise<string | null> {
  console.log('🚀 ~ file: sessionprovider.tsx:11 ~ getAccessToken ~ getAccessToken:', getAccessToken);
  return await AsyncStorage.getItem(ACCESS_TOKEN);
}

export async function deleteSession(): Promise<void> {
  await AsyncStorage.removeItem('userToken');
}
