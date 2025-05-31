import { ProductSearch } from '../../../product-search/productSearch.tsx';
import styles from './right-menu.module.css';

export const RightNavMenu = () => {
  return (
    <div className={styles.bottomNavigationMenu}>
      <ProductSearch />
    </div>
  );
};
