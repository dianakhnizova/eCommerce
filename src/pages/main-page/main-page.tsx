import styles from './main-page.module.css';
import { Wrapper } from '../../components/wrapper/wrapper';
import { Products } from '../../components/products/products';
import { MainNavigation } from './main-navigation/main-navigation';

export const MainPage = () => {
  return (
    <Wrapper className={styles.container}>
      <MainNavigation />
      <h2>Featured Product</h2>
      <Products />
    </Wrapper>
  );
};
