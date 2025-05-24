import { observer } from 'mobx-react-lite';
import { userStore } from '../../../store/user-store';
import { messages } from '../../../sources/messages';
import styles from './general-info.module.css';

export const GeneralInfo = observer(() => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>General info</h2>
      <div className={styles.body}>
        <div className={styles.avatar} />
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.label}> {messages.firstName}</span>
            <span className={styles.value}>
              {userStore.user?.firstName || '-'}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>{messages.lastName}</span>
            <span className={styles.value}>
              {userStore.user?.lastName || '-'}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{userStore.user?.email}</span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>Password</span>
            <span className={styles.value}>{userStore.user?.password}</span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>{messages.birth}</span>
            <span className={styles.value}>
              {userStore.user?.dateOfBirth
                ? new Date(userStore.user.dateOfBirth).toLocaleDateString()
                : '-'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
});
