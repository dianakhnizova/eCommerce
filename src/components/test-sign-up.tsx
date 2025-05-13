import { observer } from 'mobx-react-lite';
import styles from './button/button.module.css';
import { userStore } from '../store/user-store';
import { customerService } from '../api/services/customer-service';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '../router/enums';
export const TestSignUp: React.FC = observer(() => {
  const navigate = useNavigate();

  const login = () => {
    customerService
      .loginCustomer({
        email: 'test3@example.com',
        password: 'secret123',
      })
      .then(response => {
        userStore.user = response.customer;
      })
      .catch(error => {
        console.error('Error logging in:', error);
      })
      .finally(() => {
        void navigate(PagePath.root);
      });
  };

  return (
    <>
      {userStore.isPending && <p>Loading...</p>}
      <button className={styles.button} onClick={login}>
        login
      </button>

      {userStore.error && <p style={{ color: 'red' }}>{userStore.error}</p>}

      {userStore.isAuth && (
        <p>
          <strong>Customer:</strong> {userStore.user?.email}
        </p>
      )}
    </>
  );
});
