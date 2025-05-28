import styles from './product-list.module.css';
import { catalogStore } from '../../../store/catalog-store.ts';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';
import { PagePath } from '../../../router/enums.ts';
import { useEffect } from 'react';
import DEFAULT_IMAGE from '../../../../assets/images/placeholder.png';
import { CURRENCY_USD } from '../../../sources/constants/catalog.ts';

export const ProductList = observer(() => {
  const { productList, sortField, sortOrder } = catalogStore;

  useEffect(() => {
    void catalogStore.getProducts();
  }, [sortField, sortOrder]);

  useEffect(() => {
    void catalogStore.getCategories();
  }, []);

  return (
    <>
      {productList.map(product => (
        <li key={product.id}>
          <Link
            to={PagePath.productPage.replace(':id', product.id)}
            className={styles.cardContainer}
          >
            <img
              className={styles.image}
              src={product.image}
              alt={product.name}
              onError={event => {
                event.currentTarget.src = DEFAULT_IMAGE;
              }}
            />
            <p className={styles.name}>{product.name}</p>

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
          </Link>
        </li>
      ))}
    </>
  );
});
