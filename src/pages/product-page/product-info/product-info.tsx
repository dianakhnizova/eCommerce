import { Button } from '../../../components/button/button.tsx';
import type { Catalog } from '../../../sources/types/catalog';
import styles from './product-info.module.css';
import { CURRENCY_USD } from '../../../sources/constants/catalog.ts';
import { messages } from '../../../sources/messages.ts';
import { cartStore } from '../../../store/cart-store.ts';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';

type Props = {
  product: Catalog.DetailedProduct;
};

export const ProductInfo = observer(({ product }: Props) => {
  const isInCart = cartStore.isInCart(product.id);

  const handleAddToCart = () => {
    void cartStore.addItem({
      productId: product.id,
      quantity: 1,
    });
  };

  const handleRemove = async () => {
    await cartStore.removeItem(product.id);
    if (!cartStore.error) {
      toast.success(messages.success.successItemRemoval);
    } else {
      toast.error(cartStore.error);
    }
  };

  const isLoading = cartStore.isLoading;

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

      {isInCart ? (
        <Button onClick={handleRemove} disabled={isLoading}>
          {messages.buttons.removeFromCart}
        </Button>
      ) : (
        <Button onClick={handleAddToCart} disabled={isLoading}>
          {messages.buttons.addToCart}
        </Button>
      )}
    </div>
  );
});
