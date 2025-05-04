import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { BASE_URL } from './constants';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(handleRequest, handleError);

function handleRequest(config: InternalAxiosRequestConfig<void>) {
  return config;
}

function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    console.log('Status:', error.response?.status);
    console.log('Data:', error.response?.data);
  }
  throw new Error('Failed to fetch access token');
}
