import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { cartStore } from '../../../store/cart-store.ts';
import { Button } from '../../../components/button/button';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '../../../router/enums';
import { messages } from '../../../sources/messages';
import styles from './promo-banner.module.css';
import { PromoCode } from '../../../components/promocode/promo-code.tsx';

export const PromoBanner = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    void cartStore.getActivePromoCodes();
  }, []);

  const toCatalogPage = () => {
    void navigate(PagePath.catalogPage);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.mainTitle}>{messages.titles.mainBannerTitle}</h1>
        <span className={styles.mainText}>{messages.mainBannerText}</span>
        <Button className={styles.shopButton} onClick={toCatalogPage}>
          {messages.buttons.shopNow}
        </Button>
        {cartStore.promoCodes.length > 0 && <PromoCode />}
      </div>
    </div>
  );
});
