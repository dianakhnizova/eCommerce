import { LSKeys } from '../sources/enums/ls-keys';
import type { Auth } from '../sources/types/auth';
import type { Customer } from '../sources/types/customer';
import { isTokenFresh } from '../utils/is-token-fresh';
import { loadTokenFromLS } from '../utils/load-token-from-ls';
import { saveTokenToLS } from '../utils/save-token-to-ls';
import { authService } from './services/auth-service';

type Locks = {
  [LSKeys.USER_TOKEN]?: Promise<Auth.Token>;
  [LSKeys.ANON_TOKEN]?: Promise<Auth.Token>;
};

export class TokenManager {
  private user: Auth.Token | null = loadTokenFromLS(LSKeys.USER_TOKEN) || null;
  private anon: Auth.Token | null = loadTokenFromLS(LSKeys.ANON_TOKEN) || null;
  private locks: Locks = {};

  public logout() {
    localStorage.clear();
    this.anon = null;
    this.user = null;
  }

  public async fetchUserToken(customer: Customer.Profile) {
    this.user = await authService.getUserToken(customer);
    this.user = saveTokenToLS(LSKeys.USER_TOKEN, this.user);
    this.anon = null;
    localStorage.removeItem(LSKeys.ANON_TOKEN);
  }

  public async fetchAnonToken() {
    this.anon = await authService.getAnonymousToken();
    this.anon = saveTokenToLS(LSKeys.ANON_TOKEN, this.anon);
  }

  public async getAccessToken(): Promise<string> {
    if (this.user) {
      this.user = await this.ensureFresh(LSKeys.USER_TOKEN, this.user);
      return this.user.access_token;
    }

    if (!this.anon) await this.fetchAnonToken();

    this.anon = await this.ensureFresh(LSKeys.ANON_TOKEN, this.anon!);
    return this.anon.access_token;
  }

  private async ensureFresh(
    key: LSKeys.USER_TOKEN | LSKeys.ANON_TOKEN,
    token: Auth.Token
  ): Promise<Auth.Token> {
    if (isTokenFresh(token)) return token;
    if (this.locks[key]) return await this.locks[key];

    this.locks[key] = authService.refreshToken(token.refresh_token);

    try {
      let refreshed = await this.locks[key];

      if (!refreshed.refresh_token) {
        refreshed.refresh_token = token.refresh_token;
      }

      refreshed = saveTokenToLS(key, refreshed);

      return refreshed;
    } finally {
      delete this.locks[key];
    }
  }
}

export const tokenManager = new TokenManager();
