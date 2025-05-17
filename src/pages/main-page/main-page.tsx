import styles from './main-page.module.css';
import { Wrapper } from '../../components/wrapper/wrapper';
import { Products } from '../../components/products/products';
import { MainTitle } from './main-title/main-title';

export const MainPage = () => {
  return (
    <Wrapper className={styles.container}>
      <MainTitle />
      <h2>Featured Product</h2>
      <Products />
    </Wrapper>
  );
};
