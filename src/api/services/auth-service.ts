import {
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
  SCOPE,
} from '../../sources/constants/api';
import type { Auth } from '../../sources/types/auth';
import { authApi } from '../axios';
import { Endpoints } from '../endpoints';

export const authService = {
  getAnonymousToken: async (): Promise<Auth.Token> => {
    const parameters = new URLSearchParams({
      grant_type: 'client_credentials',
      scope: SCOPE,
    });
    console.log('get new token');
    const response = await authApi.post<Auth.Token>(
      `${PROJECT_KEY}/${Endpoints.TOKEN_ANONYMOUS}`,
      parameters,
      {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      }
    );

    return response.data;
  },

  isActive: async (token: string): Promise<boolean> => {
    const parameters = new URLSearchParams({
      token: token,
    });
    console.log('introspect token');
    const response = await authApi.post<{ active: boolean }>(
      `/${Endpoints.INTROSPECT}`,
      parameters,
      {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      }
    );
    return response.data.active;
  },

  refreshToken: async (refreshToken: string): Promise<Auth.Token> => {
    const parameters = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
    console.log('refreshing token');
    const response = await authApi.post<Auth.Token>(
      `/${Endpoints.TOKEN}`,
      parameters,
      {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      }
    );

    return response.data;
  },
};
