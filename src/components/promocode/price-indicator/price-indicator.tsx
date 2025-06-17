import { CURRENCY_USD } from '../../../sources/constants/catalog';
import { cartStore } from '../../../store/cart-store';
import { messages } from '../messages';
import styles from './price-indicator.module.css';
import { observer } from 'mobx-react-lite';

export const PriceIndicator = observer(() => {
  return (
    <div className={styles.priceContainer}>
      <span>{messages.totalCost}</span>
      {cartStore.cart?.discountCodes?.length ? (
        <>
          <span className={styles.priceWithoutDiscount}>
            {CURRENCY_USD}
            {(cartStore.totalPriceBeforePromoCode?.centAmount ??
              cartStore.cart.totalPrice.centAmount ??
              0) / 100}
          </span>
          <span className={styles.discountPrice}>
            {CURRENCY_USD}
            {(cartStore.cart.totalPrice.centAmount ?? 0) / 100}
          </span>
        </>
      ) : (
        <span>
          {CURRENCY_USD}
          {(cartStore.cart?.totalPrice.centAmount ?? 0) / 100}
        </span>
      )}
    </div>
  );
});
