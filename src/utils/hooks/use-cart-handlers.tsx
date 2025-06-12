import type { MouseEvent } from 'react';
import { cartStore } from '../../store/cart-store';

export const useCartHandlers = (productId: string) => {
  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void cartStore.addItem({ productId });
  };

  const handleRemoveFromCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void cartStore.removeItem(productId);
  };

  const handleUpdateQuantity = (
    productQuantity: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (productQuantity <= 0) {
      void cartStore.removeItem(productId);
      return;
    }
    void cartStore.updateItemQuantity(productId, productQuantity);
  };

  return {
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
  };
};
