import { observer } from 'mobx-react-lite';
import type { ProductCard as ProductCardType } from '../types';
import DEFAULT_IMAGE from '../../../../../assets/images/placeholder.png';
import { cartStore } from '../../../../store/cart-store';
import { generatePath, Link } from 'react-router-dom';
import { PagePath } from '../../../../router/enums';
import { DEFAULT_VALUE } from '../../../../sources/enums/default-values';
import styles from './product-card.module.css';
import { CURRENCY_USD } from '../../../../sources/constants/catalog';
import { messages } from '../../../../sources/messages.ts';
import { Button } from '../../../../components/button/button.tsx';

export const ProductCard = observer(
  ({ product }: { product: ProductCardType }) => {
    const isInCart = cartStore.isInCart(product.id);

    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      void cartStore.addItem({ productId: product.id, quantity: 1 });
    };

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
          {!isInCart ? (
            <Button onClick={handleAddToCart}>
              {messages.buttons.addToCart}
            </Button>
          ) : (
            <>
              <Button>{messages.buttons.removeFromCart}</Button>
            </>
          )}
        </Link>
      </li>
    );
  }
);
