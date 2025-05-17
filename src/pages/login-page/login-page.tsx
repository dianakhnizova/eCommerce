import { useEffect } from 'react';
import { TestSignUp } from '../../components/test-sign-up';
import { userStore } from '../../store/user-store';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '../../router/enums';
import { observer } from 'mobx-react-lite';

export const LoginPage = observer(() => {
  const router = useNavigate();

  useEffect(() => {
    console.log('on Login Page', userStore.isAuth);
    if (userStore.isAuth) {
      void router(PagePath.root);
    }
  }, [userStore.isAuth, router]);

  return (
    <>
      <h1>Login Page</h1>
      <TestSignUp />
    </>
  );
});
