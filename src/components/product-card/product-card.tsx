import { observer } from 'mobx-react-lite';
import type { ProductCard as ProductCardType } from '../../pages/catalog-page/catalog/product-list/types.ts';
import DEFAULT_IMAGE from '../../../assets/images/placeholder.png';
import { cartStore } from '../../store/cart-store.ts';
import { generatePath, Link } from 'react-router-dom';
import { PagePath } from '../../router/enums.ts';
import { DEFAULT_VALUE } from '../../sources/enums/default-values.ts';
import styles from './product-card.module.css';
import { CURRENCY_USD } from '../../sources/constants/catalog.ts';
import { ProductMenu } from './product-menu.tsx';

export const ProductCard: React.FC<{
  product: ProductCardType;
  isShowInCart?: boolean;
}> = observer(({ product, isShowInCart = false }) => {
  const quantity = cartStore.getItemQuantity(product.id);

  return (
    <li key={product.id}>
      <Link
        to={generatePath(PagePath.productPage, {
          categorySlug: product.categorySlug || DEFAULT_VALUE.CATEGORY,
          subcategorySlug: product.subcategorySlug || DEFAULT_VALUE.SUBCATEGORY,
          id: product.id,
        })}
        className={styles.card}
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
            {isShowInCart
              ? `${Number(product.price) * quantity}`
              : product.price}
          </p>
          <p className={styles.discountPrice}>
            {CURRENCY_USD}
            {isShowInCart
              ? `${Number(product.discountPrice) * quantity}`
              : product.discountPrice}
          </p>
        </div>
        <ProductMenu productId={product.id} />
      </Link>
    </li>
  );
});
