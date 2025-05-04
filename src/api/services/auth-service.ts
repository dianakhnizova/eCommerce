import type { Token } from '../../sources/token';
import { api } from '../axios';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, SCOPE } from '../constants';
import { Endpoints } from '../endpoints';

export const authService = {
  getAccessToken: async (): Promise<Token> => {
    const parameters = new URLSearchParams({
      grant_type: 'client_credentials',
      scope: SCOPE,
    });

    const tokenURL = `${AUTH_URL}/${Endpoints.TOKEN}`;

    const response = await api.post<Token>(tokenURL, parameters, {
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },
};
