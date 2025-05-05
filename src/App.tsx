import { useEffect, useState } from 'react';
import { authService } from './api/services/auth-service';

export default function App() {
  const [token, setToken] = useState<string>();
  const [authError, setAuthError] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getAccessToken()
      .then(token => setToken(token.access_token))
      .catch(() => setAuthError('Не удалось получить токен'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>eCommerce Application</h1>

      {loading && <p>Получаем токен…</p>}
      {authError && <p style={{ color: 'red' }}>{authError}</p>}
      {token && (
        <p>
          <strong>Token:</strong> {token}
        </p>
      )}
    </>
  );
}
