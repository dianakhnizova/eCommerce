import { LSKeys } from '../sources/enums/ls-keys';
import type { Auth } from '../sources/types/auth';
import { isToken } from './is-token';

export const getSavedToken = (): Auth.Token | undefined => {
  const raw = localStorage.getItem(LSKeys.TOKEN);
  if (!raw) return;

  const parsed: unknown = JSON.parse(raw);

  if (!isToken(parsed)) return;
  if (!isFresh(parsed)) return;

  return parsed;
};

const isFresh = (token: Auth.Token): boolean => {
  const tokenExpiration = new Date(token.expires_in * 1000);
  return tokenExpiration >= new Date();
};
