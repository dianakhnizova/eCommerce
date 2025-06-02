import { observer } from 'mobx-react-lite';
import { messages } from '../../../sources/messages';
import { userStore } from '../../../store/user-store';
import { AddressCard } from './address-card/address-card';
import styles from '../profile-page.module.css';
import { Button } from '../../../components/button/button';

export const Addresses: React.FC = observer(() => {
  const allAddresses = userStore.user?.addresses || [];

  const handleNewAddress = async () => {
    await userStore.addNewAddress({
      city: messages.emptyValue,
      country: 'UNDEFINED',
      streetName: messages.emptyValue,
      postalCode: messages.emptyValue,
    });
  };

  return (
    <>
      <h2>{messages.addresses}</h2>
      <div className={styles.addressesContainer}>
        <Button
          onClick={handleNewAddress}
          disabled={userStore.isPending}
          className={styles.editBtn}
        >
          {messages.buttons.addAddress}
        </Button>

        {allAddresses.length > 0 ? (
          allAddresses.map(address => {
            return <AddressCard key={address.id} address={address} />;
          })
        ) : (
          <p>{messages.noAddresses}</p>
        )}
      </div>
    </>
  );
});
