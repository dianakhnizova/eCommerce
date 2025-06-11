import type { MouseEvent } from 'react';
import { cartStore } from '../store/cart-store';

export const handleAddToCart =
  (productId: string) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void cartStore.addItem({ productId });
  };

export const handleRemoveFromCart =
  (productId: string) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void cartStore.removeItem(productId);
  };
