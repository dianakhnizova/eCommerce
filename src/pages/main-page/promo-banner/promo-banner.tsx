import styles from './promo-banner.module.css';
import { messages } from './messages';
import { Button } from '../../../components/button/button';

export const PromoBanner = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.mainTitle}>{messages.mainTitle}</h1>
        <span className={styles.mainText}>{messages.mainText}</span>
        <Button
          className={styles.shopButton}
          onClick={() => console.log('Shop')}
        >
          {messages.shopButton}
        </Button>
      </div>
    </div>
  );
};
