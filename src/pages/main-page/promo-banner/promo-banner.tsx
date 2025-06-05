import styles from './promo-banner.module.css';
import { messages } from './messages';
import { Button } from '../../../components/button/button';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '../../../router/enums';

export const PromoBanner = () => {
  const navigate = useNavigate();

  const toCatalogPage = () => {
    void navigate(PagePath.catalogPage);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.mainTitle}>{messages.mainTitle}</h1>
        <span className={styles.mainText}>{messages.mainText}</span>
        <Button className={styles.shopButton} onClick={toCatalogPage}>
          {messages.shopButton}
        </Button>
      </div>
    </div>
  );
};
