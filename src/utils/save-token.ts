import { LSKeys } from '../sources/enums/ls-keys';
import type { Auth } from '../sources/types/auth';

export const saveNewToken = (token: Auth.Token) => {
  token.expires_in = Math.floor((Date.now() + token.expires_in * 1000) / 1000);
  localStorage.setItem(LSKeys.TOKEN, JSON.stringify(token));
};
