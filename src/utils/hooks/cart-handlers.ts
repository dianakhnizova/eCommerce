import type { MouseEvent } from 'react';
import { cartStore } from '../../store/cart-store';

const handleAddToCart = (
  productId: string,
  event: MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
  event.stopPropagation();
  void cartStore.addItem({ productId });
};

const handleRemoveFromCart = (
  productId: string,
  event: MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
  event.stopPropagation();
  void cartStore.removeItem(productId);
};

const handleUpdateQuantity = (
  productId: string,
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

export const useCartHandlers = () => {
  return {
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
  };
};
