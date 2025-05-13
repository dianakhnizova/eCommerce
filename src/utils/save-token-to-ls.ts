import { LSKeys } from '../sources/enums/ls-keys';
import type { Auth } from '../sources/types/auth';

export const saveTokenToLS = (token: Auth.Token) => {
  const newTimestamp = Date.now() + token.expires_in * 1000;
  const newToken = { ...token, expires_in: newTimestamp };
  localStorage.setItem(LSKeys.TOKEN, JSON.stringify(newToken));
};
