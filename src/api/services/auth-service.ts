import {
  API_URL,
  AUTH_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  SCOPE,
} from '../../sources/constants/api';
import type { Auth } from '../../sources/types/auth';
import type { Customer } from '../../sources/types/customer';
import { api } from '../axios';
import { Endpoints } from '../endpoints';
import { saveNewToken } from '../../utils/save-token';

type CustomerResponse = { customer: Customer.Profile };

export const authService = {
  getAccessToken: async (): Promise<Auth.Token> => {
    const parameters = new URLSearchParams({
      grant_type: 'client_credentials',
      scope: SCOPE,
    });

    const tokenURL = `${AUTH_URL}/${Endpoints.TOKEN_ANONYMOUS}`;

    const response = await api.post<Auth.Token>(tokenURL, parameters, {
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    saveNewToken(response.data);

    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<Auth.Token> => {
    const parameters = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    const response = await api.post<Auth.Token>(
      `${AUTH_URL}/${Endpoints.TOKEN}`,
      parameters,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    saveNewToken(response.data);
    return response.data;
  },

  signupNewCustomer: async (
    customer: Customer.Profile
  ): Promise<CustomerResponse> => {
    const signupURL = `${API_URL}/${Endpoints.SIGN_UP}`;

    const response = await api.post<CustomerResponse>(signupURL, customer);

    return response.data;
  },

  loginCustomer: async (
    customer: Customer.Profile
  ): Promise<CustomerResponse> => {
    const loginURL = `${API_URL}/${Endpoints.LOGIN}`;

    const response = await api.post<CustomerResponse>(loginURL, customer);

    return response.data;
  },
};
