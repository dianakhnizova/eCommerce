import styles from './promo-code.module.css';
import { messages } from '../../sources/messages.ts';
import { cartStore } from '../../store/cart-store.ts';
import { observer } from 'mobx-react-lite';

export const PromoCode = observer(() => {
  return (
    <div className={styles.promoCodeListWrapper}>
      <p className={styles.promoTitle}>
        {messages.promoCode.actualPromocodesText}
      </p>
      <ul className={styles.promoCodeList}>
        {cartStore.promoCodes.map(code => (
          <li key={code.id} className={styles.promoItem}>
            <b>{code.code}</b>
            {code.name.en || messages.promoCode.noDescriptionText}
          </li>
        ))}
      </ul>
    </div>
  );
});
