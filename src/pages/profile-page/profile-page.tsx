import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import { Wrapper } from '../../components/wrapper/wrapper';
import styles from './profile-page.module.css';

export const ProfilePage = () => {
  return (
    <>
      <BreadCrumbs />
      <Wrapper className={styles.aboutWrapper}>Profile</Wrapper>
    </>
  );
};
