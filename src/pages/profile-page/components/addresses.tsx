import { observer } from 'mobx-react-lite';
import { messages } from '../../../sources/messages';
import { userStore } from '../../../store/user-store';
import { AddressCard } from './address-card';
import styles from '../profile-page.module.css';
import { Button } from '../../../components/button/button';
import { RiAddLine } from 'react-icons/ri';

const UNDEFINED_COUNTRY = 'UNDEFINED';

export const Addresses: React.FC = observer(() => {
  const allAddresses = userStore.user?.addresses || [];

  const handleNewAddress = async () => {
    const firstCountry = userStore.user?.addresses?.[0]?.country;

    await userStore.addNewAddress({
      city: messages.emptyValue,
      country: firstCountry || UNDEFINED_COUNTRY,
      streetName: messages.emptyValue,
      postalCode: messages.emptyValue,
    });
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{messages.addresses}</h2>
        <Button
          onClick={handleNewAddress}
          disabled={userStore.isPending}
          className={styles.editBtn}
        >
          <RiAddLine size={20} />
          {messages.buttons.addAddress}
        </Button>
      </div>

      <div className={styles.addressList}>
        {allAddresses.length > 0 ? (
          allAddresses.map(address => {
            return <AddressCard key={address.id} address={address} />;
          })
        ) : (
          <p>{messages.noAddresses}</p>
        )}
      </div>
    </div>
  );
});
