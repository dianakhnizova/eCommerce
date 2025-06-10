import styles from './promo-banner.module.css';
import { Button } from '../../../components/button/button';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '../../../router/enums';
import { messages } from '../../../sources/messages';

export const PromoBanner = () => {
  const navigate = useNavigate();

  const toCatalogPage = () => {
    void navigate(PagePath.catalogPage);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.mainTitle}>{messages.titles.mainBannerTitle}</h1>
        <span className={styles.mainText}>{messages.mainBannerText}</span>
        <Button className={styles.shopButton} onClick={toCatalogPage}>
          {messages.buttons.shopNow}
        </Button>
      </div>
    </div>
  );
};
