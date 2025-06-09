import styles from './product-list.module.css';
import { catalogStore } from '../../../store/catalog-store.ts';
import { observer } from 'mobx-react-lite';
import { generatePath, Link } from 'react-router-dom';
import { PagePath } from '../../../router/enums.ts';
import { useEffect } from 'react';
import DEFAULT_IMAGE from '../../../../assets/images/placeholder.png';
import { CURRENCY_USD } from '../../../sources/constants/catalog.ts';
import { DEFAULT_VALUE } from '../../../sources/enums/default-values.ts';
import { messages } from '../../../sources/messages.ts';

export const ProductList = observer(() => {
  const {
    productList,
    sortField,
    sortOrder,
    selectedCategoryId,
    selectedSubcategoryId,
    searchName,
    selectedColors,
    selectedSizes,
    priceFrom,
    priceTo,
  } = catalogStore;
  const hasProducts = productList.length > 0;

  useEffect(() => {
    void catalogStore.getProducts();
  }, [
    selectedCategoryId,
    selectedSubcategoryId,
    sortField,
    sortOrder,
    searchName,
    selectedColors,
    selectedSizes,
    priceFrom,
    priceTo,
  ]);

  useEffect(() => {
    void catalogStore.getColorsAndSizes();
  }, []);

  return (
    <>
      {hasProducts ? (
        productList.map(product => (
          <li key={product.id}>
            <Link
              to={generatePath(PagePath.productPage, {
                categorySlug: product.categorySlug || DEFAULT_VALUE.CATEGORY,
                subcategorySlug:
                  product.subcategorySlug || DEFAULT_VALUE.SUBCATEGORY,
                id: product.id,
              })}
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
        ))
      ) : (
        <p className={styles.emptyMessage}>{messages.noProducts}</p>
      )}
    </>
  );
});
