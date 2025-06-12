import { observer } from 'mobx-react-lite';
import type { ProductCard as ProductCardType } from '../../types.ts';
import DEFAULT_IMAGE from '../../../../../../assets/images/placeholder.png';
import { cartStore } from '../../../../../../store/cart-store.ts';
import { generatePath, Link } from 'react-router-dom';
import { PagePath } from '../../../../../../router/enums.ts';
import styles from './product-card.module.css';
import { useCartHandlers } from '../../../../../../utils/hooks/use-cart-handlers.tsx';
import { messages } from '../../../../../../sources/messages.ts';
import { Button } from '../../../../../../components/button/button.tsx';
import { DEFAULT_VALUE } from '../../../../../../sources/enums/default-values.ts';
import { CURRENCY_USD } from '../../../../../../sources/constants/catalog.ts';

export const ProductCard = observer(
  ({ product }: { product: ProductCardType }) => {
    const isInCart = cartStore.isInCart(product.id);
    const { handleAddToCart, handleRemoveFromCart } = useCartHandlers(
      product.id
    );

    return (
      <li key={product.id}>
        <Link
          to={generatePath(PagePath.productPage, {
            categorySlug: product.categorySlug || DEFAULT_VALUE.CATEGORY,
            subcategorySlug:
              product.subcategorySlug || DEFAULT_VALUE.SUBCATEGORY,
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
              {product.price}
            </p>
            <p className={styles.discountPrice}>
              {CURRENCY_USD}
              {product.discountPrice}
            </p>
          </div>

          <Button onClick={isInCart ? handleRemoveFromCart : handleAddToCart}>
            {isInCart
              ? messages.buttons.removeFromCart
              : messages.buttons.addToCart}
          </Button>
        </Link>
      </li>
    );
  }
);
