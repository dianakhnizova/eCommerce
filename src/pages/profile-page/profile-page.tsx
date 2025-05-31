import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import { Spinner } from '../../components/spinner/spinner';
import { Wrapper } from '../../components/wrapper/wrapper';
import { userStore } from '../../store/user-store';
import { BillingAddresses } from './components/billing-addresses';
import { ShippingAddresses } from './components/shipping-addresses';
import styles from './profile-page.module.css';
import { GeneralInfo } from './components/general-info';
import { ChangePassword } from './components/change-password';

export const ProfilePage = () => {
  return (
    <>
      <Spinner isLoading={userStore.isPending} />;
      <BreadCrumbs />
      <Wrapper className={styles.profileWrapper}>
        <GeneralInfo />
        <ChangePassword />
        <ShippingAddresses />
        <BillingAddresses />
      </Wrapper>
    </>
  );
};
