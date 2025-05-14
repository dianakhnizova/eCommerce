import { LSKeys } from '../sources/enums/ls-keys';
import type { Auth } from '../sources/types/auth';
import { isToken } from './is-token';

export const loadTokenFromLS = (): Auth.Token | undefined => {
  const raw = localStorage.getItem(LSKeys.TOKEN);
  if (!raw) return;

  const parsed: unknown = JSON.parse(raw);
  if (!isToken(parsed)) return;

  return parsed;
};
