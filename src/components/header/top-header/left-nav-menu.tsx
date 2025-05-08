import styles from '../header.module.css';
import { NavLink } from 'react-router-dom';
import { leftLinks } from './constants';

export const LeftNavMenu = () => {
  return (
    <nav className={styles.navigationMenu}>
      {leftLinks.map(link => {
        return (
          <NavLink key={link.label} to={link.to} className={styles.link}>
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );
};
