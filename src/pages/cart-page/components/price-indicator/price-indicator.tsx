import { CURRENCY_USD } from '../../../../sources/constants/catalog';
import { cartStore } from '../../../../store/cart-store';
import { messages } from '../../../../components/promocode/messages';
import styles from './price-indicator.module.css';
import { observer } from 'mobx-react-lite';
import { Button } from '../../../../components/button/button';

export const PriceIndicator = observer(() => {
  const totalPrice = (cartStore.cart?.totalPrice.centAmount ?? 0) / 100;
  const priceBeforePromo =
    (cartStore.totalPriceBeforePromoCode?.centAmount ?? totalPrice * 100) / 100;

  const hasDiscount =
    cartStore.cart?.discountCodes?.length && priceBeforePromo > totalPrice;

  const discountCode = cartStore.cart?.discountCodes?.[0] ?? null;

  return (
    <div className={styles.priceContainer}>
      {hasDiscount ? (
        <>
          <div className={styles.priceLine}>
            <span className={styles.mainPrice}>{messages.item}</span>
            <span className={styles.priceWithoutDiscount}>
              {CURRENCY_USD}
              {priceBeforePromo}
            </span>
          </div>

          <div className={styles.priceLine}>
            <span className={styles.mainPrice}>{messages.sale}</span>
            <span className={styles.discountPrice}>
              {CURRENCY_USD}
              {totalPrice}
            </span>
          </div>

          <div className={styles.priceLine}>
            <span className={styles.totalCost}>{messages.totalCost}</span>
            <span className={styles.discountPrice}>
              {CURRENCY_USD}
              {totalPrice}
            </span>
          </div>

          {discountCode && (
            <Button
              onClick={() =>
                cartStore.removePromoCode(discountCode.discountCode.id)
              }
            >
              {messages.removeButton}
            </Button>
          )}
        </>
      ) : (
        <div className={styles.priceLine}>
          <span className={styles.totalCost}>
            {messages.totalCost}
            {CURRENCY_USD}
            {totalPrice}
          </span>
        </div>
      )}
    </div>
  );
});
