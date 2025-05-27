import { ProductList } from '../product-card/product-card';
import styles from './catalog.module.css';
import { SideBar } from './filtering/sidebar';

export const Catalog = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <ul className={styles.cardsContainer}>
        <ProductList />
      </ul>
    </div>
  );
};
