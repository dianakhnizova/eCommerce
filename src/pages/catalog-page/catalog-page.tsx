import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import styles from './catalog-page.module.css';

export const CatalogPage = () => {
  return (
    <>
      <BreadCrumbs />
      <h2 className={styles.catalogPage}>Catalog Page</h2>;
    </>
  );
};
