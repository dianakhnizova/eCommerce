import { api } from '../axios';
import { authUrl, clientId, clientSecret, scope } from '../constants';
import { Endpoints } from '../endpoints';

export type Token = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

export const authService = {
  saveNewToken: (token: Token) => {
    token.expires_in = Math.floor(
      (Date.now() + token.expires_in * 1000) / 1000
    );
    localStorage.setItem('token', JSON.stringify(token));
  },

  getSavedToken: (): Token | undefined => {
    const savedToken = localStorage.getItem('token');

    if (savedToken) {
      const savedTokenData: Token = JSON.parse(savedToken);
      const tokenExpiration = new Date(savedTokenData.expires_in * 1000);
      const currentTime = new Date();
      if (tokenExpiration < currentTime) return;
      return savedTokenData;
    }
    return;
  },

  getAccessToken: async (): Promise<Token> => {
    const parameters = new URLSearchParams({
      grant_type: 'client_credentials',
      scope: scope,
    });

    const tokenURL = `${authUrl}/${Endpoints.TOKEN}`;

    const response = await api.post<Token>(tokenURL, parameters, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },
};
