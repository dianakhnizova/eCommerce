import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { BASE_URL } from '../sources/constants/api';
import { getSavedToken } from '../utils/get-saved-token';
import { isApiError } from '../utils/is-api-error';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(handleRequest);

api.interceptors.response.use(response => response, handleResponseError);

function handleRequest(config: InternalAxiosRequestConfig<void>) {
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  const token = getSavedToken();

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token.access_token}`;
  }
  return config;
}

function handleResponseError(error: unknown): never {
  if (isApiError(error)) {
    console.log(error.response?.data.message);
    throw new Error(error.response?.data.message);
  }
  throw error;
}
