import { messages } from '../../../../sources/messages';
import type { Customer } from '../../../../sources/types/customer';
import styles from './address-card.module.css';

export const AddressCard: React.FC<
  Partial<Customer.Address> & { isDefault: boolean }
> = ({ country, city, postalCode, streetName, isDefault }) => (
  <div className={styles.card}>
    {isDefault && <div className={styles.badge}>{messages.default}</div>}
    <ul className={styles.list}>
      <li className={styles.item}>
        <span className={styles.label}>{messages.country}</span>
        <span className={styles.value}>{country}</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>{messages.city}</span>
        <span className={styles.value}>{city}</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>{messages.street}</span>
        <span className={styles.value}>{streetName}</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>{messages.postcode}</span>
        <span className={styles.value}>{postalCode}</span>
      </li>
    </ul>
  </div>
);
