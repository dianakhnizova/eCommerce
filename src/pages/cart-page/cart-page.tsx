import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import { cartStore } from '../../store/cart-store';
import { messages } from './messages';

export const CartPage = () => {
  const items = cartStore.cart?.lineItems || [];
  return (
    <>
      <BreadCrumbs />
      {items.length > 0 ? (
        items.map(item => (
          <div key={item.id}>
            <p>{item.name.en}</p>
            <p>{item.productId}</p>
          </div>
        ))
      ) : (
        <p>{messages.emptyCart}</p>
      )}
    </>
  );
};
