import { ProductList } from '../product-card/product-card';
import styles from './catalog.module.css';

export const Catalog = () => {
  return (
    <ul className={styles.container}>
      <ProductList />
    </ul>
  );
};
