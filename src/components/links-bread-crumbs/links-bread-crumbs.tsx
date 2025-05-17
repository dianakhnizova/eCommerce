import styles from './links-bread-crumbs.module.css';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { getNavigationLinks } from './navigationLinks';
import { messages } from './messages';

export const LinksBreadCrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigationLinks = getNavigationLinks(currentPath);

  return (
    <div className={styles.linkContainer}>
      {navigationLinks.map((link, index) => {
        if (index === 1 && link.label === messages.homeLink) {
          return null;
        }
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
