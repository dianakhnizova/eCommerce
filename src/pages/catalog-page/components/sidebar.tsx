import { messages } from './messages';
import styles from './sidebar.module.css';

export const SideBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <h2 className={styles.title}>{messages.titleSideBar}</h2>
        <select className={styles.select}>
          <option>{messages.categoryOption}</option>
          <option>{messages.brandOption}</option>
          <option>{messages.colorOption}</option>
          <option>{messages.sizeOption}</option>
          <option>{messages.priceOption}</option>
        </select>
      </div>
    </div>
  );
};
