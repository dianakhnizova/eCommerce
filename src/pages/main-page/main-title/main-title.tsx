import styles from './main-title.module.css';
import { messages } from './messages';
import MainPageImage from '../../../../assets/images/main-page-img.jpg';
import { Button } from '../../../components/button/button';

export const MainTitle = () => {
  return (
    <div className={styles.mainContainer}>
      <img
        className={styles.imgMain}
        src={MainPageImage}
        alt={messages.mainPageImg}
      />
      <div className={styles.titleContainer}>
        <p className={styles.mainTitle}>{messages.mainTitle}</p>
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
