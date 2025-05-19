import axios from 'axios';
import { isApiError } from '../utils/is-api-error';
import { AUTH_URL, BASE_URL } from '../sources/constants/api';
import { tokenManager } from './token-manager';

export const baseApi = axios.create({ baseURL: BASE_URL });

export const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

baseApi.interceptors.request.use(async cfg => {
  const token = await tokenManager.getAccessToken();

  cfg.headers['Content-Type'] = 'application/json';
  cfg.headers.Authorization = `Bearer ${token}`;

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
