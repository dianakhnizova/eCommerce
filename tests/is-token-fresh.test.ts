import { describe, it, expect, vi } from 'vitest';
import { isTokenFresh } from '../src/utils/is-token-fresh';
import type { Auth } from '../src/sources/types/auth';

const createToken = (expiresAt: number): Auth.Token => ({
  access_token: 'dummy-token',
  token_type: 'Bearer',
  expires_in: 3600,
  scope: 'read',
  expires_at: expiresAt,
});

describe('isTokenFresh', () => {
  const now = 1_000_000;
  const margin = 120_000;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true when token is far from expiring', () => {
    const token = createToken(now + 5 * margin);
    expect(isTokenFresh(token)).toBe(true);
  });

  it('returns false when token expires within the safety margin', () => {
    const token = createToken(now + 60_000);
    expect(isTokenFresh(token)).toBe(false);
  });

  it('returns false when token is already expired', () => {
    const token = createToken(now - 1);
    expect(isTokenFresh(token)).toBe(false);
  });

  it('returns false when token expires exactly in 2 minutes', () => {
    const token = createToken(now + margin);
    expect(isTokenFresh(token)).toBe(false);
  });
});
