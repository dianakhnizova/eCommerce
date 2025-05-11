import styles from './bread-crumbs.module.css';
import { NavLink } from 'react-router';
import classNames from 'classnames';
import type { LinkItems } from '../../sources/types/types';

type Props = {
  navigationLinks: LinkItems[];
};

export const BreadCrumbs = ({ navigationLinks }: Props) => {
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
