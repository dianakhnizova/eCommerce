import styles from './product-card.module.css';
import { catalogStore } from '../../../store/catalog-store';
import { useEffect } from 'react';
import { messages } from './messages';
import { observer } from 'mobx-react-lite';
import DEFAULT_IMAGE from '../../../../assets/images/placeholder.png';
import { Link } from 'react-router';

export const ProductList = observer(() => {
  const { productList, getProducts } = catalogStore;

  useEffect(() => {
    void getProducts();
  }, []);

  return (
    <>
      {productList.map(product => (
        <li key={product.id}>
          <Link to={`/catalog/${product.id}`} className={styles.cardContainer}>
            <img
              className={styles.image}
              src={product.image}
              alt={product.name}
              onError={event => {
                event.currentTarget.src = DEFAULT_IMAGE;
              }}
            />
            <span className={styles.name}>{product.name}</span>

            <p className={styles.description}>{product.description}</p>
            <div className={styles.priceContainer}>
              <p className={styles.price}>
                {messages.priceTitle}
                {product.price}
              </p>
              <p className={styles.discountPrice}>
                {messages.priceTitle}
                {product.discountPrice}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
});
