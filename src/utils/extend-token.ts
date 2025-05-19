import type { Auth } from '../sources/types/auth';

export const extendToken = (token: Auth.Token): Auth.Token => {
  const newTimestampInMs = Date.now() + token.expires_in * 1000;
  const newToken = { ...token, expires_at: newTimestampInMs };
  return newToken;
};
