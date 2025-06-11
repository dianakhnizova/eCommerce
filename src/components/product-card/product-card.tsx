import { observer } from 'mobx-react-lite';
import type { ProductCard as ProductCardType } from '../../pages/catalog-page/product-list/types.ts';
import DEFAULT_IMAGE from '../../../assets/images/placeholder.png';
import { cartStore } from '../../store/cart-store.ts';
import { generatePath, Link } from 'react-router-dom';
import { PagePath } from '../../router/enums.ts';
import { DEFAULT_VALUE } from '../../sources/enums/default-values.ts';
import styles from './product-card.module.css';
import { CURRENCY_USD } from '../../sources/constants/catalog.ts';
import { messages } from '../../sources/messages.ts';
import { Button } from '../button/button.tsx';

import { RiAddFill, RiDeleteBinLine, RiSubtractFill } from 'react-icons/ri';
import { useCartHandlers } from '../../utils/hooks/cart-handlers.ts';

export const ProductCard = observer(
  ({ product }: { product: ProductCardType }) => {
    const isInCart = cartStore.isInCart(product.id);
    const quantity = cartStore.getItemQuantity(product.id);
    const { handleAddToCart, handleRemoveFromCart, handleUpdateQuantity } =
      useCartHandlers();

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
              {quantity ? `${Number(product.price) * quantity}` : product.price}
            </p>
            <p className={styles.discountPrice}>
              {CURRENCY_USD}
              {quantity
                ? `${Number(product.discountPrice) * quantity}`
                : product.discountPrice}
            </p>
          </div>
          {isInCart ? (
            <>
              <div className={styles.itemMenu}>
                <Button
                  onClick={event => handleRemoveFromCart(product.id, event)}
                >
                  <RiDeleteBinLine />
                </Button>
                <Button
                  onClick={event =>
                    handleUpdateQuantity(product.id, quantity - 1, event)
                  }
                >
                  <RiSubtractFill />
                </Button>
                <span>{quantity}</span>
                <Button
                  onClick={event =>
                    handleUpdateQuantity(product.id, quantity + 1, event)
                  }
                >
                  <RiAddFill />
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={event => handleAddToCart(product.id, event)}>
              {messages.buttons.addToCart}
            </Button>
          )}
        </Link>
      </li>
    );
  }
);
