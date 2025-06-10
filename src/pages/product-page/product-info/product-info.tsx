import { Button } from '../../../components/button/button.tsx';
import type { Catalog } from '../../../sources/types/catalog';
import styles from './product-info.module.css';
import { CURRENCY_USD } from '../../../sources/constants/catalog.ts';
import { messages } from '../../../sources/messages.ts';
import { cartStore } from '../../../store/cart-store.ts';
import { observer } from 'mobx-react-lite';

type Props = {
  product: Catalog.DetailedProduct;
};

export const ProductInfo = observer(({ product }: Props) => {
  const isInCart = cartStore.isInCart(product.id);

  const handleAddToCart = () =>
    void cartStore.addItem({
      productId: product.id,
    });

  const handleRemove = () => void cartStore.removeItem(product.id);

  return (
    <div className={styles.productInfo}>
      <h2 className={styles.productName}>{product.name}</h2>
      <div className={styles.pricesWrapper}>
        <p className={styles.price}>
          {CURRENCY_USD}
          {product.price}
        </p>
        <p className={styles.discountPrice}>
          {CURRENCY_USD}
          {product.discountPrice}
        </p>
      </div>
      <p>{product.color}</p>
      <p>{product.size}</p>
      <p className={styles.description}>{product.description}</p>

      <Button
        onClick={isInCart ? handleRemove : handleAddToCart}
        disabled={cartStore.isLoading}
      >
        {isInCart
          ? messages.buttons.removeFromCart
          : messages.buttons.addToCart}
      </Button>
    </div>
  );
});
