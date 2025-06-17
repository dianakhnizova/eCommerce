import { Input } from '../../input/input';
import { cartStore } from '../../../store/cart-store';
import { useState } from 'react';
import { messages } from '../../../sources/messages';
import styles from './promo-code-input.module.css';
import { Button } from '../../button/button';
import { observer } from 'mobx-react-lite';

export const PromoCodeInputPanel = observer(() => {
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) return;

    void cartStore.addPromoCode(promoCode.trim());
  };

  return (
    <div className={styles.promoCodeSection}>
      <Input
        type="text"
        value={promoCode}
        onChange={e => setPromoCode(e.target.value)}
        placeholder={messages.promoCode.placeholder}
        className={styles.promoCodeInput}
      />
      <Button onClick={handleApplyPromoCode}>
        {messages.promoCode.button}
      </Button>
    </div>
  );
});
