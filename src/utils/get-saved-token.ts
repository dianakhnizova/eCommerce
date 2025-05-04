import type { Token } from '../sources/token';
import { isToken } from './is-token';

export const getSavedToken = (): Token | undefined => {
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    const parsedToken: unknown = JSON.parse(savedToken);
    if (isToken(parsedToken)) {
      const tokenExpiration = new Date(parsedToken.expires_in * 1000);
      if (tokenExpiration >= new Date()) {
        return parsedToken;
      }
    }
  }
  return;
};
