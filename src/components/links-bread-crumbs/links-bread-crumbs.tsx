import styles from './links-bread-crumbs.module.css';
import { NavLink } from 'react-router-dom';
import { messages } from './messages';
import { PagePath } from '../../router/enums';
import { usePageInfo } from '../../utils/hooks/usePageInfo';

export const LinksBreadCrumbs = () => {
  const { title } = usePageInfo();
  return (
    <div className={styles.linkContainer}>
      <NavLink to={PagePath.root} className={styles.link}>
        {messages.homeLink}
      </NavLink>
      <span className={styles.activeLink}>{title}</span>
    </div>
  );
};
