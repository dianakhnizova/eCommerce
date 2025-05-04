import type { Token } from '../sources/token';

export const saveNewToken = (token: Token) => {
  token.expires_in = Math.floor((Date.now() + token.expires_in * 1000) / 1000);
  localStorage.setItem('token', JSON.stringify(token));
};
