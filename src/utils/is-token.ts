import type { Auth } from '../sources/types/auth';

export function isToken(data: unknown): data is Auth.Token {
  if (typeof data !== 'object' || data === null) return false;
  return (
    'access_token' in data &&
    typeof data['access_token'] === 'string' &&
    'token_type' in data &&
    typeof data['token_type'] === 'string' &&
    'expires_in' in data &&
    typeof data['expires_in'] === 'number' &&
    'scope' in data &&
    typeof data['scope'] === 'string'
  );
}
