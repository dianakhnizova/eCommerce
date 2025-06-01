import { OptionForm } from './options/option-form';
import { messages } from './messages';
import styles from './sidebar.module.css';

export const SideBar = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.mainTitle}>{messages.titleSideBar}</h2>
      <OptionForm />
    </div>
  );
};
