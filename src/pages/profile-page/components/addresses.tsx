import { observer } from 'mobx-react-lite';
import { messages } from '../../../sources/messages';
import { userStore } from '../../../store/user-store';
import { AddressCard } from './address-card';
import styles from '../profile-page.module.css';
import { Button } from '../../../components/button/button';
import { RiAddLine } from 'react-icons/ri';
import { useToggleModal } from '../../../utils/hooks/use-toggle-modal';
import { NewAddressModal } from './new-address-modal';

export const Addresses: React.FC = observer(() => {
  const allAddresses = userStore.user?.addresses || [];
  const { isMenuOpen, toggleMenu, closeMenu } = useToggleModal();

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{messages.addresses}</h2>
        <Button
          onClick={toggleMenu}
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

      <NewAddressModal closeMenu={closeMenu} isOpen={isMenuOpen} />
    </div>
  );
});
