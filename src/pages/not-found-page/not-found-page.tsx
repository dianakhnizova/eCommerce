import { Button } from '../../components/button/button';
import { messages } from './messages';
import styles from './not-found.module.css';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '../../router/enums';
import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import NotFoundImage from '../../../assets/images/not-found.png';

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
          alt={messages.errorMessage}
        />
        <p className={styles.textImage}>{messages.textImageOops}</p>
        <Button onClick={backToPage}>{messages.backButton}</Button>
      </div>
    </>
  );
};
