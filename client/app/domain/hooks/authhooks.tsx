import axios from 'axios';
import Constants from 'expo-constants';
import { from, Observable, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserResponse } from '@/models/user';
import { saveAccessToken } from '@/app/domain/providers/sessionprovider';
import { axiosRequest } from '../helpers/axiosauthwrapper';

const ROOT_URL = Constants.expoConfig?.extra?.apiUrl;

export const signUp = (userCredentials: {
  username: string;
  password: string;
}): Observable<User> => {
  const options = {
    method: 'POST', 
    url: `${ROOT_URL}/auth/signup`,
    data: userCredentials,
  }
  return axiosRequest<UserResponse>(options).pipe(
    map((fullUser) => {
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
  const options = {
    method: 'POST', 
    url: `${ROOT_URL}/auth/login`,
    data: userCredentials,
  }
  return axiosRequest<{ access_token: string }>(options).pipe(
    map((response) => response.access_token)
  );
};

export const signOut = () => {
  // Implement sign-out logic here
  // setUser(null);
};
