import type { Auth } from '../sources/types/auth';

export function isTokenFresh(userToken: Auth.Token): boolean {
  const now = Date.now();
  const safetyMargin = 60;
  return now < userToken.expires_in - safetyMargin;
}
