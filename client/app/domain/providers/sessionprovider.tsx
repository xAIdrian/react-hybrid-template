import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN = 'access_token';

export async function saveAccessToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(ACCESS_TOKEN, token);
}

export async function getAccessToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(ACCESS_TOKEN);
}

export async function deleteSession(): Promise<void> {
  await SecureStore.deleteItemAsync('userToken');
}
