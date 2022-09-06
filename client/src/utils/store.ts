/* eslint-disable @typescript-eslint/dot-notation */
import { atom, selector } from 'recoil';
import { client } from './api/api';

interface IToken {
  status: string;
  message: string;
  accessToken: string;
}

interface IResponse {
  status: string;
  message: string;
  email: string;
}

export const userInfo = atom({
  key: 'userInfo',
  default: '',
});
export const refreshSelector = selector({
  key: 'refresh/user',
  get: async ({ get }) => {
    let user = get(userInfo);
    await client.get('/api/refresh').then(async (res) => {
      const data = res.data as IToken;
      client.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      await client
        .get('/api/user')
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then((res) => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const data = res.data as IResponse;
          user = data['email'];
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return user;
  },
});
