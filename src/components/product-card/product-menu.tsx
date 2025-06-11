import { RiAddFill, RiDeleteBinLine, RiSubtractFill } from 'react-icons/ri';
import { messages } from '../../sources/messages';
import { cartStore } from '../../store/cart-store';
import { useCartHandlers } from '../../utils/hooks/cart-handlers';
import { Button } from '../button/button';
import styles from './product-card.module.css';

export const ProductMenu: React.FC<{ productId: string }> = ({ productId }) => {
  const isInCart = cartStore.isInCart(productId);
  const quantity = cartStore.getItemQuantity(productId);
  const { handleAddToCart, handleRemoveFromCart, handleUpdateQuantity } =
    useCartHandlers();
  return (
    <>
      {isInCart ? (
        <div className={styles.itemMenu}>
          <Button onClick={event => handleRemoveFromCart(productId, event)}>
            <RiDeleteBinLine />
          </Button>
          <Button
            onClick={event =>
              handleUpdateQuantity(productId, quantity - 1, event)
            }
          >
            <RiSubtractFill />
          </Button>
          <span>{quantity}</span>
          <Button
            onClick={event =>
              handleUpdateQuantity(productId, quantity + 1, event)
            }
          >
            <RiAddFill />
          </Button>
        </div>
      ) : (
        <Button onClick={event => handleAddToCart(productId, event)}>
          {messages.buttons.addToCart}
        </Button>
      )}
    </>
  );
};
