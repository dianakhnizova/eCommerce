import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import { Spinner } from '../../components/spinner/spinner';
import { Wrapper } from '../../components/wrapper/wrapper';
import { userStore } from '../../store/user-store';

import styles from './profile-page.module.css';
import { GeneralInfo } from './components/general-info';
import { ChangePassword } from './components/change-password';
import { Addresses } from './components/addresses';
import { PagePath } from '../../router/enums';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const ProfilePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userStore.isAuth) {
      void navigate(PagePath.loginPage);
    }
  }, [userStore.isAuth, navigate]);
  return (
    <>
      <Spinner isLoading={userStore.isPending} />;
      <BreadCrumbs />
      <Wrapper className={styles.profileWrapper}>
        <GeneralInfo />
        <ChangePassword />
        <Addresses />
      </Wrapper>
    </>
  );
};
