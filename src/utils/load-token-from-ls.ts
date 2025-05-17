import type { LSKeys } from '../sources/enums/ls-keys';
import type { Auth } from '../sources/types/auth';
import { isToken } from './is-token';

export const loadTokenFromLS = (tokenKey: LSKeys): Auth.Token | undefined => {
  const raw = localStorage.getItem(tokenKey);
  if (!raw) return;

  const parsed: unknown = JSON.parse(raw);
  if (!isToken(parsed)) return;

  return parsed;
};
