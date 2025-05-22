import { ProductCard } from '../product-card/product-card';
import styles from './catalog.module.css';

export const Catalog = () => {
  return (
    <div className={styles.container}>
      <ProductCard />
    </div>
  );
};
