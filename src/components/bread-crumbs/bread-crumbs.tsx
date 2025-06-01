import styles from './bread-crumbs.module.css';
import { Wrapper } from '../wrapper/wrapper';
import { LinksBreadCrumbs } from './links-bread-crumbs/links-bread-crumbs';
import { usePageInfo } from '../../utils/hooks/use-page-info';

export const BreadCrumbs = () => {
  const { title } = usePageInfo();

  return (
    <div className={styles.breadCrumbsContainer}>
      <Wrapper className={styles.breadCrumbsWrapper}>
        <h2 className={styles.pageTitle}>{title}</h2>
        <LinksBreadCrumbs />
      </Wrapper>
    </div>
  );
};
