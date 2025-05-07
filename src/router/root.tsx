import { Outlet } from 'react-router-dom';
import styles from './root.module.css';

export const Root = () => {
  return (
    <>
      <div className={styles.root}>
        <h1>Header</h1>
        <Outlet />
        <h1>Footer</h1>
      </div>
    </>
  );
};
