import { observer } from 'mobx-react-lite';
import { messages } from '../../../sources/messages';
import { userStore } from '../../../store/user-store';
import { AddressCard } from './address-card/address-card';
import styles from '../profile-page.module.css';
import { useEffect, useState } from 'react';

export const ShippingAddresses = observer(() => {
  const addresses = userStore.shippingAddresses;
  const [defaultAddressID, setDefaultAddressID] = useState<string>();
  useEffect(() => {
    setDefaultAddressID(userStore.user?.defaultShippingAddressId || '');
  }, [userStore.user]);
  return (
    <>
      <h2>{messages.shippingAddresses}</h2>
      <div className={styles.addressesContainer}>
        {addresses.length > 0
          ? addresses.map(address => {
              return (
                <AddressCard
                  address={address}
                  key={address.id}
                  handleUpdate={userStore.updateShippingAddress}
                  isDefault={address.id === defaultAddressID}
                  setDefault={setDefaultAddressID}
                />
              );
            })
          : messages.noAddresses}
      </div>
    </>
  );
});
