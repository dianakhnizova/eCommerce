import { LSKeys } from '../sources/enums/ls-keys';
import type { Auth } from '../sources/types/auth';
import { isToken } from './is-token';

export const getSavedToken = (): Auth.Token | undefined => {
  const savedToken = localStorage.getItem(LSKeys.TOKEN);
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
