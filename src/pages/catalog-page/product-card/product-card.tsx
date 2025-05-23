import styles from './product-card.module.css';
import { catalogStore } from '../../../store/catalog-store';
import { useEffect } from 'react';
import { messages } from './messages';
import { observer } from 'mobx-react-lite';
import DEFAULT_IMAGE from '../../../../assets/images/placeholder.jpg';
import { Link } from 'react-router-dom';

export const ProductList = observer(() => {
  const { productList, getProducts } = catalogStore;

  useEffect(() => {
    void getProducts();
  }, []);

  return (
    <>
      {productList.map(product => (
        <Link to={`/catalog/${product.id}`} key={product.id}>
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
                {messages.priceTitle}
                {product.price}
              </p>
              <p className={styles.discountPrice}>
                {messages.priceTitle}
                {product.discountPrice}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </>
  );
});
