import { Input } from '../../../../components/input/input';
import { cartStore } from '../../../../store/cart-store';
import { useState } from 'react';
import { messages } from '../../../../sources/messages';
import styles from './promo-code-input.module.css';
import { Button } from '../../../../components/button/button';
import { observer } from 'mobx-react-lite';

export const PromoCodeInputPanel = observer(() => {
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) return;

    await cartStore.addPromoCode(promoCode.trim());
  };

  const isButtonDisabled =
    cartStore.isLoading || (cartStore.cart?.discountCodes?.length ?? 0) > 0;

  return (
    <div className={styles.promoCodeSection}>
      <Input
        type="text"
        value={promoCode}
        onChange={e => setPromoCode(e.target.value)}
        placeholder={messages.promoCode.placeholder}
        className={styles.promoCodeInput}
      />
      <Button onClick={handleApplyPromoCode} disabled={isButtonDisabled}>
        {messages.promoCode.button}
      </Button>
    </div>
  );
});
