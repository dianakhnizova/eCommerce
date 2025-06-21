import { messages } from '../sources/messages';
import { isApiError } from '../utils/is-api-error';

export const getErrorMessage = (error: unknown): string => {
  let message = messages.errors.default;

  if (isApiError(error)) {
    message = error.response?.data?.message || message;
  } else if (error instanceof Error) message = error.message;

  return message;
};
