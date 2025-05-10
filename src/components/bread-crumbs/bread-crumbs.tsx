import styles from './bread-crumbs.module.css';
import { navigationLinks } from './constants';
import { NavLink } from 'react-router';
import classNames from 'classnames';

export const BreadCrumbs = () => {
  return (
    <div className={styles.linkContainer}>
      {navigationLinks.map((link, index) => {
        const isLastLink = index === navigationLinks.length - 1;
        return (
          <NavLink
            key={link.label}
            to={link.to}
            className={classNames(styles.link, isLastLink && styles.activeLink)}
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
};
