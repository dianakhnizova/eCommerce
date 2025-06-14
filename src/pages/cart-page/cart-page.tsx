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
import { prepareCartItemForProductCard } from '../../utils/prepare-product-card-for-cart';

export const CartPage = observer(() => {
  const items = cartStore.cart?.lineItems || [];
  const navigate = useNavigate();

  const toCatalogPage = () => {
    void navigate(PagePath.catalogPage);
  };

  const handleClearCart = () => {
    void cartStore.clear();
  };

  return (
    <>
      <BreadCrumbs />
      <Wrapper className={styles.cartPageWrapper}>
        <Button onClick={handleClearCart} className={styles.clearCartButton}>
          {messages.buttons.clearCart}
        </Button>
        {items.length > 0 ? (
          <ul className={styles.cartPageProductList}>
            {items.map(item => (
              <ProductCard
                key={item.id}
                product={prepareCartItemForProductCard(item)}
                isShowInCart={true}
              />
            ))}
          </ul>
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
