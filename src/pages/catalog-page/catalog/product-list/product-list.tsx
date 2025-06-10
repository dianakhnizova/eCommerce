import styles from './product-list.module.css';
import { catalogStore } from '../../../../store/catalog-store.ts';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { messages } from '../../../../sources/messages.ts';
import { ProductCard } from './product-card/product-card.tsx';

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
    pagination: { offset, limit, total },
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
    offset,
    limit,
    total,
  ]);

  useEffect(() => {
    void catalogStore.getColorsAndSizes();
  }, []);

  return (
    <ul className={styles.cardsContainer}>
      {hasProducts ? (
        productList.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className={styles.emptyMessage}>{messages.noProducts}</p>
      )}
    </ul>
  );
});
