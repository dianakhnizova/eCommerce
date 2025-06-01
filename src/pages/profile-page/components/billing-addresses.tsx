import { observer } from 'mobx-react-lite';
import { messages } from '../../../sources/messages';
import { userStore } from '../../../store/user-store';
import { AddressCard } from './address-card/address-card';
import styles from '../profile-page.module.css';

export const BillingAddresses = observer(() => {
  const addresses = userStore.billingAddresses;

  return (
    <>
      <h2>{messages.billingAddresses}</h2>
      <div className={styles.addressesContainer}>
        {addresses?.length
          ? addresses?.map(address => {
              return <AddressCard address={address} key={address.id} />;
            })
          : messages.noAddresses}
      </div>
    </>
  );
});
