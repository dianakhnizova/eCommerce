import { useEffect, useState } from 'react';
import { authService } from '../api/services/auth-service';
import type { Customer } from '../sources/types/customer';

export const TestSignUp: React.FC = () => {
  const [token, setToken] = useState<string>();
  const [newCustomer, setNewCustomer] = useState<string>();
  const [authError, setAuthError] = useState<string>();
  const [loading, setLoading] = useState(true);

  const fetchToken = async () => {
    try {
      const token = await authService.getAccessToken();
      setToken(token.access_token);
    } catch (error) {
      console.log(error);
      setAuthError('Не удалось получить токен');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchToken();
  }, []);

  useEffect(() => {
    const signupFakeCustomer = async () => {
      try {
        if (!token) {
          setAuthError('Токен не получен');
          return;
        }

        const customer: Pick<
          Customer.Customer,
          'email' | 'password' | 'firstName' | 'lastName'
        > = {
          email: 'test@example.com',
          password: 'secret123',
          firstName: 'Sobaka',
          lastName: 'Babaka',
        };

        const response = await authService.signupNewCustomer({
          token,
          customer,
        });
        console.log('Customer created:', response.customer);
        setNewCustomer(
          `${response.customer.firstName} ${response.customer.lastName} (${response.customer.email}) с ID ${response.customer.id})`
        );
      } catch (error) {
        if (error instanceof Error) {
          setAuthError(error.message);
        } else {
          setAuthError('Неизвестная ошибка');
        }
      }
    };
    if (token) {
      void signupFakeCustomer();
    }
  }, [token]);
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
      {newCustomer && (
        <p>
          <strong>New Customer:</strong> {newCustomer}
        </p>
      )}
    </>
  );
};
