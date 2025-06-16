import { observer } from 'mobx-react-lite';
import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import { cartStore } from '../../store/cart-store';
import { useNavigate } from 'react-router';
import { PagePath } from '../../router/enums';
import styles from './cart-page.module.css';
import { Button } from '../../components/button/button';
import emptyCartIllustration from '../../../assets/images/empty-cart.png';
import { Wrapper } from '../../components/wrapper/wrapper';
import { messages } from '../../sources/messages';
import { CURRENCY_USD } from '../../sources/constants/catalog';
import { ProductCard } from '../../components/product-card/product-card';
import { Input } from '../../components/input/input.tsx';
import { useState } from 'react';

export const CartPage = observer(() => {
  const items = cartStore.cart?.lineItems || [];
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');

  const toCatalogPage = () => {
    void navigate(PagePath.catalogPage);
  };

  const handleClearCart = () => {
    void cartStore.clear();
  };

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) return;

    void cartStore.addPromoCode(promoCode.trim());
  };

  return (
    <>
      <BreadCrumbs />
      <Wrapper className={styles.cartPageWrapper}>
        <Button onClick={handleClearCart} className={styles.clearCartButton}>
          {messages.buttons.clearCart}
        </Button>
        {items.length > 0 ? (
          <>
            <ul className={styles.cartPageProductList}>
              {cartStore.product.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>

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
          </>
        ) : (
          <>
            <p className={styles.emptyCartTitle}>{messages.emptyCart}</p>
            <img src={emptyCartIllustration} alt={messages.emptyCart}></img>
            <Button onClick={toCatalogPage}>
              {messages.buttons.toCatalog}
            </Button>
          </>
        )}
        <h3>
          {messages.totalCost} {CURRENCY_USD}
          {(cartStore.cart?.totalPrice.centAmount ?? 0) / 100}
        </h3>
      </Wrapper>
    </>
  );
});
