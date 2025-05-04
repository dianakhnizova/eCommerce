import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { baseUrl } from './constants';
import { authService } from './services/auth-service';

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(handleRequest, handleError);

async function handleRequest(config: InternalAxiosRequestConfig<void>) {
  const newToken = await authService.getAccessToken();
  config.headers.Authorization = `Bearer ${newToken.access_token}`;
  return config;
}

function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
  }
  throw new Error('Failed to fetch access token');
}
