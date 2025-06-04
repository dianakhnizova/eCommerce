import { observer } from 'mobx-react-lite';
import { messages } from '../../../sources/messages';
import { userStore } from '../../../store/user-store';
import { AddressCard } from './address-card';
import { useEffect, useRef } from 'react';
import styles from '../profile-page.module.css';
import { Button } from '../../../components/button/button';
import { RiCloseFill } from 'react-icons/ri';

const UNDEFINED_COUNTRY = 'UNDEFINED';

interface NewAddressModalProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export const NewAddressModal: React.FC<NewAddressModalProps> = observer(
  ({ isOpen, closeMenu }) => {
    const allAddresses = userStore.user?.addresses || [];

    const draft = {
      city: messages.emptyValue,
      country: allAddresses[0]?.country || UNDEFINED_COUNTRY,
      streetName: messages.emptyValue,
      postalCode: messages.emptyValue,
    };

    const prevAddressesRef = useRef<number>(allAddresses.length);

    useEffect(() => {
      const prevCount = prevAddressesRef.current;
      const currCount = allAddresses.length;

      if (isOpen && !userStore.error && currCount > prevCount) {
        closeMenu();
      }

      prevAddressesRef.current = currCount;
    }, [allAddresses.length, isOpen]);

    return (
      <>
        {isOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
              <Button onClick={closeMenu} className={styles.editBtn}>
                <RiCloseFill size={20} />
              </Button>
              <AddressCard address={draft} isEdit={true} />
              {userStore.error && (
                <p className={styles.error}>{userStore.error}</p>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
);
