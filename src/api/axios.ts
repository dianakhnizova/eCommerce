import axios from 'axios';
import { loadTokenFromLS } from '../utils/load-token-from-ls';
import { isApiError } from '../utils/is-api-error';
import { authService } from './services/auth-service';
import { AUTH_URL, BASE_URL } from '../sources/constants/api';
import { LSKeys } from '../sources/enums/ls-keys';

export const baseApi = axios.create({ baseURL: BASE_URL });

export const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

baseApi.interceptors.request.use(async cfg => {
  let token = loadTokenFromLS();

  if (token) {
    const active = await authService
      .isActive(token.access_token)
      .catch(() => false);

    if (!active) {
      try {
        const refreshed = await authService.refreshToken(token.refresh_token);
        token = refreshed;
        localStorage.setItem(LSKeys.TOKEN, JSON.stringify(token));
        console.log('Token refreshed:', token);
      } catch (error) {
        // 5) Если refresh-токен не найден или просрочен — получаем новый токен полностью
        // const isInvalidGrant =
        //   axios.isAxiosError(error) &&
        //   error.response?.status === 400 &&
        //   error.response?.data.error === 'invalid_grant';
        // if (isInvalidGrant) {
        //   token = await authService.getAccessToken();
        //   localStorage.setItem(LSKeys.TOKEN, JSON.stringify(token));
        console.log('Refresh failed', error);
        // } else {
        //   // 6) Для прочих ошибок пробрасываем дальше
        //   throw error;
        // }
      }
    }
  } else {
    token = await authService.getAnonymousToken();
    localStorage.setItem(LSKeys.TOKEN, JSON.stringify(token));
    console.log('No token in storage, got new one:', token);
  }

  cfg.headers['Content-Type'] = 'application/json';
  cfg.headers.Authorization = `Bearer ${token.access_token}`;

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
