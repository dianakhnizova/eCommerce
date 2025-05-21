import {
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
  SCOPE,
} from '../../sources/constants/api';
import type { Auth } from '../../sources/types/auth';
import type { Customer } from '../../sources/types/customer';
import { authApi } from '../axios';
import { Endpoints } from '../endpoints';

export const authService = {
  getAnonymousToken: async (): Promise<Auth.Token> => {
    const parameters = new URLSearchParams({
      grant_type: 'client_credentials',
      scope: SCOPE,
    });
    console.log('get new anonymous token');
    const response = await authApi.post<Auth.Token>(
      `${PROJECT_KEY}${Endpoints.TOKEN_ANONYMOUS}`,
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

  getUserToken: async (customer: Customer.Profile): Promise<Auth.Token> => {
    const parameters = new URLSearchParams({
      grant_type: 'password',
      scope: SCOPE,
      username: customer.email,
      password: customer.password,
    });

    console.log('get new user token');
    const response = await authApi.post<Auth.Token>(
      `${PROJECT_KEY}${Endpoints.CUSTOMERS}${Endpoints.TOKEN}`,
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

  refreshToken: async (refreshToken: string): Promise<Auth.Token> => {
    const parameters = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
    console.log('refreshing token');
    const response = await authApi.post<Auth.Token>(
      `${Endpoints.TOKEN}`,
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
