import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import styles from './root.module.css';
import classNames from 'classnames';

export const Root = () => {
  return (
    <>
      <Header />
      <main className={styles.section}>
        <Outlet />
      </main>
      <footer className={classNames(styles.section, styles.footer)}>
        <Footer />
      </footer>
    </>
  );
};
