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
import { isApiError } from '../../utils/is-api-error';
import { saveNewToken } from '../../utils/save-token';

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

  signupNewCustomer: async (
    customer: Customer.Profile
  ): Promise<{ customer: Customer.Profile; cart: Customer.Cart }> => {
    try {
      const signupURL = `${API_URL}/${Endpoints.SIGN_UP}`;

      const response = await api.post<{
        customer: Customer.Profile;
        cart: Customer.Cart;
      }>(signupURL, customer);

      return response.data;
    } catch (error) {
      if (isApiError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  },
};
