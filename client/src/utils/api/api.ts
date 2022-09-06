/* eslint-disable @typescript-eslint/dot-notation */
import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export async function refreshApi() {
  // eslint-disable-next-line @typescript-eslint/return-await
  return await client.get('/api/refresh').then((res) => {
    client.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
  });
}
