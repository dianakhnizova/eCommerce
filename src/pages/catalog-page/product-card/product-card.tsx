import styles from './product-card.module.css';
import { catalogStore } from '../../../store/catalog-store';
import { useEffect } from 'react';
import { messages } from './messages';
import { observer } from 'mobx-react-lite';

export const ProductCard = observer(() => {
  const { productList, getProducts } = catalogStore;

  useEffect(() => {
    void getProducts();
  }, []);

  return (
    <>
      {productList.map(product => (
        <div key={product.name} className={styles.cardContainer}>
          <span className={styles.name}>{product.name}</span>
          <img
            className={styles.image}
            src={product.image}
            alt={product.name}
          />
          <p className={styles.description}>{product.description}</p>
          <div className={styles.priceContainer}>
            <p>
              {messages.priceTitle} {product.price}
            </p>
            <p className={styles.discountPrice}>
              {messages.discountPriceTitle} {product.discountPrice}
            </p>
          </div>
        </div>
      ))}
    </>
  );
});
