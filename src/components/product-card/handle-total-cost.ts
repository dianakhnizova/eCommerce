import { cartStore } from '../../store/cart-store';

export const handleTotalCost = (productId: string, quantity: number) => {
  const cartItem = cartStore.cart?.lineItems.find(
    item => item.productId === productId
  );
  const pricePerUnit =
    cartItem?.price?.discounted?.value?.centAmount ??
    cartItem?.price?.value?.centAmount ??
    0;
  const totalPrice = ((pricePerUnit * quantity) / 100).toFixed(2);

  return totalPrice;
};
