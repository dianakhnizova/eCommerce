import { ProductList } from './product-list/product-list';
import styles from './catalog.module.css';
import { SideBar } from './filtering/sidebar';

export const Catalog = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <ProductList />
    </div>
  );
};
