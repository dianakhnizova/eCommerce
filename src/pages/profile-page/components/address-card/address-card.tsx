import type { Customer } from '../../../../sources/types/customer';
import styles from './address-card.module.css';
import { messages } from './messages';

interface AddressCardProps {
  address: Customer.Address & { isDefault: boolean };
}

export const AddressCard: React.FC<AddressCardProps> = ({ address }) => (
  <div className={styles.card}>
    {address.isDefault && (
      <div className={styles.badge}>{messages.default}</div>
    )}
    <ul className={styles.list}>
      <li className={styles.item}>
        <span className={styles.label}>{messages.country}</span>
        <span className={styles.value}>{address.country}</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>{messages.city}</span>
        <span className={styles.value}>{address.city}</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>{messages.streetName}</span>
        <span className={styles.value}>{address.streetName}</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>{messages.postalCode}</span>
        <span className={styles.value}>{address.postalCode}</span>
      </li>
    </ul>
  </div>
);
