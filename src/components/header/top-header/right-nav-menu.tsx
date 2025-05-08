import styles from '../header.module.css';
import { NavLink } from 'react-router-dom';

export const RightNavMenu = () => {
  return (
    <nav className={styles.navigationMenu}>
      <NavLink to="/about" className={styles.link}>
        Login
      </NavLink>
      <NavLink to="/about" className={styles.link}>
        Registration
      </NavLink>
      <NavLink to="/about" className={styles.link}>
        Basket
      </NavLink>
    </nav>
  );
};
