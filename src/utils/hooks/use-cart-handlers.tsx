import type { MouseEvent } from 'react';
import { cartStore } from '../../store/cart-store';

export const useCartHandlers = (productId: string) => {
  const handleAddToCart = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await cartStore.addItem({ productId });
  };

  const handleRemoveFromCart = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await cartStore.removeItem(productId);
  };

  const handleUpdateQuantity = async (
    productQuantity: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (productQuantity <= 0) {
      void cartStore.removeItem(productId);
      return;
    }
    await cartStore.updateItemQuantity(productId, productQuantity);
  };

  return {
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
  };
};
