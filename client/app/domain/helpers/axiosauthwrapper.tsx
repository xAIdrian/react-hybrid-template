import { User } from "@/models/user";
import axios from 'axios';
import { from, Observable, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAccessToken } from '@/app/domain/providers/sessionprovider';

export function axiosRequest<T>(options: any): Observable<T> {
  return from(axios.request<T>(options)).pipe(
    map((response) => response.data),
    catchError((error) => {
      throw new Error(error.message);
    })
  );
}

export async function axiosAuthRequest<T>(
  options: any
): Promise<Observable<T>> {
  const accessToken = await getAccessToken();
  return from(axios.request<T>({
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })).pipe(
    map((response) => response.data),
    catchError((error) => {
      throw new Error(error.message);
    })
  );
}
