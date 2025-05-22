import styles from '../../header.module.css';
import { NavLink } from 'react-router-dom';
import { leftLinks } from './left-links-list';
import classNames from 'classnames';

export const LeftNavMenu = () => {
  return (
    <nav className={styles.navigationMenu}>
      {leftLinks.map(link => {
        return (
          <NavLink
            key={link.label}
            to={link.to}
            className={classNames(styles.link, styles.bottomLink)}
          >
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );
};
