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
import { ProductCard } from '../../components/product-card/product-card';
import { PriceIndicator } from './components/price-indicator/price-indicator.tsx';
import { PromoCodeInputPanel } from './components/promo-code-input-panel/promo-code-input-panel.tsx';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const CartPage = observer(() => {
  const items = cartStore.cart?.lineItems || [];
  const navigate = useNavigate();

  const toCatalogPage = () => {
    void navigate(PagePath.catalogPage);
  };

  const handleClearCart = async () => {
    const result = await MySwal.fire({
      title: messages.confirmClearCart,
      text: messages.textWarn,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: messages.buttons.confirmButtonText,
      cancelButtonText: messages.buttons.cancelButtonText,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#fb2e86',
    });

    if (result.isConfirmed) {
      await cartStore.clear();
      await MySwal.fire({
        title: messages.textClearCart,
        text: messages.success.clearCart,
        icon: 'success',
        timer: 1500,
      });
    }
  };

  return (
    <>
      <BreadCrumbs />
      <Wrapper className={styles.cartPageWrapper}>
        {items.length > 0 ? (
          <>
            <ul className={styles.cartPageProductList}>
              {cartStore.product.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>

            <PromoCodeInputPanel />
            <PriceIndicator />
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
        <Button onClick={handleClearCart} className={styles.clearCartButton}>
          {messages.buttons.clearCart}
        </Button>
      </Wrapper>
    </>
  );
});
