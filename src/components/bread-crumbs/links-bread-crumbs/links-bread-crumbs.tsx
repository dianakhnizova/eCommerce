import styles from './links-bread-crumbs.module.css';
import { NavLink } from 'react-router-dom';
import { useCrumbLinksList } from '../../../utils/hooks/use-crumb-links-list';

export const LinksBreadCrumbs = () => {
  const crumbs = useCrumbLinksList();
  return (
    <div className={styles.linkContainer}>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span
            key={crumb.to}
            className={isLast ? styles.activeLink : styles.link}
          >
            {isLast ? (
              crumb.label
            ) : (
              <NavLink to={crumb.to} className={styles.link}>
                {crumb.label}
              </NavLink>
            )}
          </span>
        );
      })}
    </div>
  );
};
