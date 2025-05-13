import { Outlet } from 'react-router';
import styles from './main-section.module.css';

export const Section = () => {
  return (
    <main className={styles.section}>
      <Outlet />
    </main>
  );
};
