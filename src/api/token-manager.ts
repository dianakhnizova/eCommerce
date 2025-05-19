import { LSKeys } from '../sources/enums/ls-keys';

import type { Auth } from '../sources/types/auth';
import type { Customer } from '../sources/types/customer';
import { isTokenFresh } from '../utils/is-token-fresh';
import { loadTokenFromLS } from '../utils/load-token-from-ls';
import { extendToken } from '../utils/extend-token';
import { authService } from './services/auth-service';

export class TokenManager {
  public static async fetchUserToken(customer: Customer.Profile) {
    const newToken = await authService.getUserToken(customer);
    const extended = extendToken(newToken);
    localStorage.setItem(LSKeys.USER_TOKEN, JSON.stringify(extended));
    localStorage.removeItem(LSKeys.ANON_TOKEN);
  }

  public static async getAccessToken(): Promise<string> {
    const anon = loadTokenFromLS(LSKeys.ANON_TOKEN);
    const user = loadTokenFromLS(LSKeys.USER_TOKEN);

    if (user) {
      const userRefreshed = await TokenManager.ensureFresh(
        LSKeys.USER_TOKEN,
        user
      );
      return userRefreshed.access_token;
    }

    if (anon) {
      const refreshed = await TokenManager.ensureFresh(LSKeys.ANON_TOKEN, anon);
      return refreshed.access_token;
    }

    const newAnon = await authService.getAnonymousToken();
    const newAnonExtended = extendToken(newAnon);
    localStorage.setItem(LSKeys.ANON_TOKEN, JSON.stringify(newAnonExtended));

    return newAnonExtended.access_token;
  }

  public static cleanup() {
    localStorage.removeItem(LSKeys.USER_TOKEN);
    localStorage.removeItem(LSKeys.ANON_TOKEN);
  }

  private static async ensureFresh(
    key: LSKeys.USER_TOKEN | LSKeys.ANON_TOKEN,
    token: Auth.Token
  ): Promise<Auth.Token> {
    if (isTokenFresh(token)) return token;

    const refreshed = await authService.refreshToken(token.refresh_token);
    if (!refreshed.refresh_token) {
      refreshed.refresh_token = token.refresh_token;
    }
    const extended = extendToken(refreshed);
    localStorage.setItem(key, JSON.stringify(extended));
    return refreshed;
  }
}
