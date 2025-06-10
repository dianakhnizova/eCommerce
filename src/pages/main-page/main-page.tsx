import styles from './main-page.module.css';
import { Wrapper } from '../../components/wrapper/wrapper';
import { PromoBanner } from './promo-banner/promo-banner';

export const MainPage = () => {
  return (
    <Wrapper className={styles.container}>
      <PromoBanner />
    </Wrapper>
  );
};
