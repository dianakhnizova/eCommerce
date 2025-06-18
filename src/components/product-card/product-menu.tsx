import { RiAddFill, RiDeleteBinLine, RiSubtractFill } from 'react-icons/ri';
import { messages } from '../../sources/messages';
import { cartStore } from '../../store/cart-store';
import { useCartHandlers } from '../../utils/hooks/use-cart-handlers';
import { Button } from '../button/button';
import styles from './product-card.module.css';
import { observer } from 'mobx-react-lite';

type Props = {
  productId: string;
  isDisabled?: boolean;
};

export const ProductMenu = observer(({ productId, isDisabled }: Props) => {
  const isInCart = cartStore.isInCart(productId);
  const quantity = cartStore.getItemQuantity(productId);
  const { handleAddToCart, handleRemoveFromCart, handleUpdateQuantity } =
    useCartHandlers(productId);

  return (
    <>
      {isInCart ? (
        <div className={styles.itemMenu}>
          <Button
            onClick={handleRemoveFromCart}
            disabled={isDisabled || cartStore.isLoading}
          >
            <RiDeleteBinLine />
          </Button>
          <Button
            onClick={event => handleUpdateQuantity(quantity - 1, event)}
            disabled={isDisabled || cartStore.isLoading}
          >
            <RiSubtractFill />
          </Button>
          <span>{quantity}</span>
          <Button
            onClick={event => handleUpdateQuantity(quantity + 1, event)}
            disabled={isDisabled || cartStore.isLoading}
          >
            <RiAddFill />
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isDisabled || cartStore.isLoading}
        >
          {messages.buttons.addToCart}
        </Button>
      )}
    </>
  );
});
