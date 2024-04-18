import React, {  useContext } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import { from, Observable, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserResponse } from '@/models/user';
import { saveAccessToken, getAccessToken } from '@/app/domain/providers/sessionprovider';

const ROOT_URL = Constants.expoConfig?.extra?.apiUrl;

export const signUp = (userCredentials: {
  username: string;
  password: string;
}): Observable<User> => {
  return from(axios.post<UserResponse>(`${ROOT_URL}/auth/signup`, userCredentials)).pipe(
    map((response) => response.data),
    map((fullUser) => {
      console.log('🚀 ~ file: authhooks.tsx:19 ~ map ~ fullUser:', fullUser);
      saveAccessToken(fullUser.access_token);
      const user: User = {
        username: fullUser.username,
        name: fullUser.name,
        email: fullUser.email,
        image: fullUser.image,
        customerId: fullUser.customerId,
        priceId: fullUser.priceId,
        hasAccess: fullUser.hasAccess,
        createdAt: fullUser.createdAt,
      };
      return user;
    }),
    catchError((error) => {
      console.error('Error signing up:', error);
      throw new Error('Error signing up');
    })
  );
};

export const login = (userCredentials: {
  username: string;
  password: string;
}): Observable<string> => {
  return from(axios.post<{ access_token: string }>(`${ROOT_URL}/auth/login`, userCredentials)).pipe(
    map((response) => response.data.access_token),
    catchError((error) => {
      console.error('Error signing in:', error);
      throw new Error('Error signing in');
    })
  );
};

export const signOut = () => {
  // Implement sign-out logic here
  // setUser(null);
};
