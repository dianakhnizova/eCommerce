import { RiAddFill, RiDeleteBinLine, RiSubtractFill } from 'react-icons/ri';
import { messages } from '../../sources/messages';
import { cartStore } from '../../store/cart-store';
import { useCartHandlers } from '../../utils/hooks/use-cart-handlers';
import { Button } from '../button/button';
import styles from './product-card.module.css';
import { observer } from 'mobx-react-lite';

export const ProductMenu = observer(({ productId }: { productId: string }) => {
  const isInCart = cartStore.isInCart(productId);
  const quantity = cartStore.getItemQuantity(productId);
  const { handleAddToCart, handleRemoveFromCart, handleUpdateQuantity } =
    useCartHandlers(productId);

  return (
    <>
      {isInCart ? (
        <div className={styles.itemMenu}>
          <Button onClick={handleRemoveFromCart}>
            <RiDeleteBinLine />
          </Button>
          <Button onClick={event => handleUpdateQuantity(quantity - 1, event)}>
            <RiSubtractFill />
          </Button>
          <span>{quantity}</span>
          <Button onClick={event => handleUpdateQuantity(quantity + 1, event)}>
            <RiAddFill />
          </Button>
        </div>
      ) : (
        <Button onClick={handleAddToCart}>{messages.buttons.addToCart}</Button>
      )}
    </>
  );
});
