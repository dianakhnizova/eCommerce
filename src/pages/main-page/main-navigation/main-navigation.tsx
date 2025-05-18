import styles from './main-navigation.module.css';
import { messages } from './messages';
import { Button } from '../../../components/button/button';

export const MainNavigation = () => {
  return (
    <div className={styles.mainContainer}>
      {/* <img
        className={styles.imgMain}
        src={MainPageImage}
        alt={messages.mainPageImg}
      /> */}
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
