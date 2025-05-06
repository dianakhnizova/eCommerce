import { useEffect, useState } from 'react';
import { authService } from './api/services/auth-service';
import { Button } from './components/buttons/buttons';

const handleClick = () => {
  console.log('Button clicked!');
};

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
      <Button
        className="button"
        label="Test Button"
        onClick={handleClick}
        disabled={false}
        type="button"
      />

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
