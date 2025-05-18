import axios from 'axios';
import { loadTokenFromLS } from '../utils/load-token-from-ls';
import { isApiError } from '../utils/is-api-error';
import { authService } from './services/auth-service';
import { AUTH_URL, BASE_URL } from '../sources/constants/api';
import { LSKeys } from '../sources/enums/ls-keys';
import { saveTokenToLS } from '../utils/save-token-to-ls';
import { isTokenFresh } from '../utils/is-token-fresh';

export const baseApi = axios.create({ baseURL: BASE_URL });

export const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

baseApi.interceptors.request.use(async cfg => {
  let userToken = loadTokenFromLS(LSKeys.USER_TOKEN);
  const isUserTokenFresh = userToken ? isTokenFresh(userToken) : false;

  if (userToken && !isUserTokenFresh) {
    userToken = await authService.refreshToken(userToken.refresh_token);
    saveTokenToLS(LSKeys.USER_TOKEN, userToken);
  }

  let anonToken = loadTokenFromLS(LSKeys.ANON_TOKEN);

  if (!anonToken) {
    anonToken = await authService.getAnonymousToken();
    saveTokenToLS(LSKeys.ANON_TOKEN, anonToken);
  }

  cfg.headers['Content-Type'] = 'application/json';
  cfg.headers.Authorization = `Bearer ${userToken?.access_token || anonToken.access_token}`;

  return cfg;
});

baseApi.interceptors.response.use(response => response, handleResponseError);

function handleResponseError(error: unknown): never {
  if (isApiError(error)) {
    console.log(error.response?.data.message);
    throw new Error(error.response?.data.message);
  }
  throw error;
}
