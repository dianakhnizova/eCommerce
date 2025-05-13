import { Outlet } from 'react-router';
import styles from './main-section.module.css';

export const MainSection = () => {
  return (
    <main className={styles.section}>
      <Outlet />
    </main>
  );
};
