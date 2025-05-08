import styles from '../header.module.css';
import { NavLink } from 'react-router-dom';

export const LeftNavMenu = () => {
  return (
    <nav className={styles.navigationMenu}>
      <NavLink to="/" className={styles.link}>
        khnizovad@gmail.com
      </NavLink>
      <NavLink to="/about" className={styles.link}>
        8 707 275 4341
      </NavLink>
    </nav>
  );
};
