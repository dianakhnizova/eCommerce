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

export const CartPage = observer(() => {
  const items = cartStore.cart?.lineItems || [];
  const navigate = useNavigate();

  const toCatalogPage = () => {
    void navigate(PagePath.catalogPage);
  };

  return (
    <>
      <BreadCrumbs />
      <Wrapper className={styles.cartPageWrapper}>
        {items.length > 0 ? (
          items.map(item => (
            <ProductCard
              key={item.id}
              product={{
                id: item.productId,
                categorySlug: item.productSlug.en,
                description: '',
                image: item.variant.images[0].url,
                name: item.name.en,
                price: (item.price.value.centAmount / 100).toString(),
                color: item.variant.attributes[0].value,
                discountPrice: item.price.discounted
                  ? (item.price.discounted.value.centAmount / 100).toString()
                  : '',
                cartItemId: item.id,
              }}
            />
          ))
        ) : (
          <>
            <p className={styles.emptyCartTitle}>{messages.emptyCart}</p>
            <img src={emptyCartIllustration} alt={messages.emptyCart}></img>
            <Button onClick={toCatalogPage}>
              {messages.buttons.toCatalog}
            </Button>
          </>
        )}
      </Wrapper>
    </>
  );
});
