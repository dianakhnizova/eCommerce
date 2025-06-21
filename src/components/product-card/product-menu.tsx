import { RiAddFill, RiDeleteBinLine, RiSubtractFill } from 'react-icons/ri';
import { messages } from '../../sources/messages';
import { cartStore } from '../../store/cart-store';
import { useCartHandlers } from '../../utils/hooks/use-cart-handlers';
import { Button } from '../button/button';
import styles from './product-card.module.css';
import { observer } from 'mobx-react-lite';
import { handleTotalCost } from './handle-total-cost';

type Props = {
  productId: string;
};

export const ProductMenu = observer(({ productId }: Props) => {
  const isInCart = cartStore.isInCart(productId);
  const quantity = cartStore.getItemQuantity(productId);
  const {
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    isCardDisabled,
  } = useCartHandlers(productId);

  return (
    <>
      {isInCart ? (
        <div className={styles.itemMenu}>
          <Button onClick={handleRemoveFromCart} disabled={isCardDisabled}>
            <RiDeleteBinLine />
          </Button>
          <Button
            onClick={event => handleUpdateQuantity(quantity - 1, event)}
            disabled={isCardDisabled}
          >
            <RiSubtractFill />
          </Button>
          <span>{quantity}</span>
          <Button
            onClick={event => handleUpdateQuantity(quantity + 1, event)}
            disabled={isCardDisabled}
          >
            <RiAddFill />
          </Button>
          <span className={styles.totalCost}>
            {messages.totalCost} ${handleTotalCost(productId, quantity)}
          </span>
        </div>
      ) : (
        <Button onClick={handleAddToCart} disabled={isCardDisabled}>
          {messages.buttons.addToCart}
        </Button>
      )}
    </>
  );
});
