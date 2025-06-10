import { Button } from '../../components/button/button';
import styles from './not-found.module.css';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '../../router/enums';
import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import NotFoundImage from '../../../assets/images/not-found.png';
import { messages } from '../../sources/messages';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const backToPage = () => {
    void navigate(PagePath.root);
  };

  return (
    <>
      <BreadCrumbs />
      <div className={styles.mainContainer}>
        <img
          className={styles.imgNotFound}
          src={NotFoundImage}
          alt={messages.errorPageImage}
        />
        <p className={styles.textImage}>{messages.errorPageDescription}</p>
        <Button onClick={backToPage}>{messages.buttons.backToHome}</Button>
      </div>
    </>
  );
};
