import { LSKeys } from '../sources/enums/ls-keys';

import type { Auth } from '../sources/types/auth';
import type { Customer } from '../sources/types/customer';
import { isTokenFresh } from '../utils/is-token-fresh';
import { loadTokenFromLS } from '../utils/load-token-from-ls';
import { extendToken } from '../utils/extend-token';
import { authService } from './services/auth-service';

export const TokenManager = {
  async fetchUserToken(customer: Customer.Profile) {
    const newToken = await authService.getUserToken(customer);
    const extended = extendToken(newToken);
    localStorage.setItem(LSKeys.USER_TOKEN, JSON.stringify(extended));
    localStorage.removeItem(LSKeys.ANON_TOKEN);
  },

  async getAccessToken(): Promise<string> {
    const anon = loadTokenFromLS(LSKeys.ANON_TOKEN);
    const user = loadTokenFromLS(LSKeys.USER_TOKEN);
    console.log('User token:', user, 'Anon token:', anon);
    if (user) {
      const userRefreshed = await TokenManager.ensureFresh(
        LSKeys.USER_TOKEN,
        user
      );
      console.log('Using user token:', userRefreshed.access_token);
      return userRefreshed.access_token;
    }
    console.warn('No user token available, falling back to anonymous token');
    if (anon) {
      const refreshed = await TokenManager.ensureFresh(LSKeys.ANON_TOKEN, anon);
      console.log('Using anon token:', refreshed.access_token);
      return refreshed.access_token;
    }

    const newAnon = await authService.getAnonymousToken();
    const newAnonExtended = extendToken(newAnon);
    localStorage.setItem(LSKeys.ANON_TOKEN, JSON.stringify(newAnonExtended));
    console.log('Using new anon token:', newAnonExtended.access_token);
    return newAnonExtended.access_token;
  },

  cleanup() {
    localStorage.removeItem(LSKeys.USER_TOKEN);
    localStorage.removeItem(LSKeys.ANON_TOKEN);
    localStorage.removeItem(LSKeys.USER_ID);
    console.log('Tokens cleared from localStorage');
  },

  async ensureFresh(
    key: LSKeys.USER_TOKEN | LSKeys.ANON_TOKEN,
    token: Auth.Token
  ): Promise<Auth.Token> {
    if (isTokenFresh(token)) return token;
    const refreshed = await authService.refreshToken(token.refresh_token!);
    if (!refreshed.refresh_token) {
      refreshed.refresh_token = token.refresh_token;
    }
    const extended = extendToken(refreshed);
    localStorage.setItem(key, JSON.stringify(extended));
    return refreshed;
  },
};
