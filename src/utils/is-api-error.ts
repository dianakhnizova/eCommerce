import axios from 'axios';
import type { AxiosError } from 'axios';
import type { ApiError } from '../sources/types/api-error';

export function isApiError(error: unknown): error is AxiosError<ApiError> {
  if (!axios.isAxiosError<ApiError>(error)) return false;
  return typeof error.response?.data?.message === 'string';
}
