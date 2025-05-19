import type { Auth } from '../sources/types/auth';

export function isTokenFresh(token: Auth.Token): boolean {
  const now = Date.now();
  const safetyMarginMs = 120_000;
  return now < token.expires_in - safetyMarginMs;
}
