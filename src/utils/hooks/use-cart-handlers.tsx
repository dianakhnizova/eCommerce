import { useState, type MouseEvent } from 'react';
import { cartStore } from '../../store/cart-store';

export const useCartHandlers = (productId: string) => {
  const [isCardDisabled, setIsCardDisabled] = useState(cartStore.isLoading);

  async function handleAddToCart(event: MouseEvent<HTMLButtonElement>) {
    setIsCardDisabled(true);
    try {
      event.preventDefault();
      event.stopPropagation();
      await cartStore.addItem({ productId });
    } finally {
      setIsCardDisabled(false);
    }
  }

  async function handleRemoveFromCart(event: MouseEvent<HTMLButtonElement>) {
    setIsCardDisabled(true);
    try {
      event.preventDefault();
      event.stopPropagation();
      await cartStore.removeItem(productId);
    } finally {
      setIsCardDisabled(false);
    }
  }

  async function handleUpdateQuantity(
    productQuantity: number,
    event: MouseEvent<HTMLButtonElement>
  ) {
    setIsCardDisabled(true);
    try {
      event.preventDefault();
      event.stopPropagation();
      if (productQuantity <= 0) {
        void cartStore.removeItem(productId);
        return;
      }
      await cartStore.updateItemQuantity(productId, productQuantity);
    } finally {
      setIsCardDisabled(false);
    }
  }

  return {
    isCardDisabled,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
  };
};
