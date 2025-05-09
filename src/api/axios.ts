import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { BASE_URL } from '../sources/constants/api';
import { getSavedToken } from '../utils/get-saved-token';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(handleRequest, handleError);

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

function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    console.log('Status:', error.response?.status);
    console.log('Data:', error.response?.data);
  }
  throw new Error('Failed to fetch access token');
}
