import styles from './main-page.module.css';
import { Wrapper } from '../../components/wrapper/wrapper';
import { Products } from '../../components/products/products';
import { PromoBanner } from './promo-banner/promo-banner';

export const MainPage = () => {
  return (
    <Wrapper className={styles.container}>
      <PromoBanner />
      <h2>Featured Product</h2>
      <Products />
    </Wrapper>
  );
};
