import styles from './product-card.module.css';
import { catalogStore } from '../../../store/catalog-store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import DEFAULT_IMAGE from '../../../../assets/images/placeholder.jpg';
import { CURRENCY_USD } from '../../../sources/constants/catalog.ts';

export const ProductList = observer(() => {
  const { productList, getProducts } = catalogStore;

  useEffect(() => {
    void getProducts();
  }, []);

  return (
    <>
      {productList.map(product => (
        <li key={product.id} className={styles.cardContainer}>
          <span className={styles.name}>{product.name}</span>
          <img
            className={styles.image}
            src={product.image}
            alt={product.name}
            onError={event => {
              event.currentTarget.src = DEFAULT_IMAGE;
            }}
          />
          <p className={styles.description}>{product.description}</p>
          <div className={styles.priceContainer}>
            <p className={styles.price}>
              {CURRENCY_USD}
              {product.price}
            </p>
            <p className={styles.discountPrice}>
              {CURRENCY_USD}
              {product.discountPrice}
            </p>
          </div>
        </li>
      ))}
    </>
  );
});
