import { observer } from 'mobx-react-lite';
import { userStore } from '../../../store/user-store';
import { AddressCard } from './address-card';
import { useEffect, useRef, useState } from 'react';
import styles from '../profile-page.module.css';
import { Button } from '../../../components/button/button';
import { RiCloseFill } from 'react-icons/ri';
import { messages } from '../../../sources/messages';

const UNDEFINED_COUNTRY = 'UNDEFINED';

interface NewAddressModalProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export const NewAddressModal: React.FC<NewAddressModalProps> = observer(
  ({ isOpen, closeMenu }) => {
    const allAddresses = userStore.user?.addresses || [];
    const [isSuccess, setIsSuccess] = useState(false);

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
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          closeMenu();
        }, 3000);
      }

      prevAddressesRef.current = currCount;
    }, [allAddresses.length, isOpen, closeMenu]);

    return (
      <>
        {isOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
              <Button onClick={closeMenu} className={styles.editBtn}>
                <RiCloseFill size={20} />
              </Button>
              {!isSuccess && <AddressCard address={draft} isEdit={true} />}
              {userStore.error && (
                <p className={styles.error}>{userStore.error}</p>
              )}
              {isSuccess && (
                <p className={styles.successModal}>
                  {messages.success.successAddressAdded}
                </p>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
);
