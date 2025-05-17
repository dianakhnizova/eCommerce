import styles from './bread-crumbs.module.css';
import { Wrapper } from '../wrapper/wrapper';
import { LinksBreadCrumbs } from '../links-bread-crumbs/links-bread-crumbs';
import { useLocation } from 'react-router-dom';
import { getPathTitle } from './getPathTitle';

export const BreadCrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={styles.breadCrumbsContainer}>
      <Wrapper className={styles.breadCrumbsWrapper}>
        <h2 className={styles.pageTitle}>{getPathTitle(currentPath)}</h2>
        <LinksBreadCrumbs />
      </Wrapper>
    </div>
  );
};
