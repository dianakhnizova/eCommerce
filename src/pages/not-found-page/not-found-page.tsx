import { Button } from '../../components/button/button';
import { PATH_TO_IMG_NOTFOUND } from './constants';
import { messages } from './messages';
import styles from './not-found.module.css';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '../../router/enums';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const backToPage = () => {
    void navigate(PagePath.root);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <img
          className={styles.imgNotFound}
          src={PATH_TO_IMG_NOTFOUND}
          alt={messages.errorMessage}
        />
        <p className={styles.textImage}>{messages.textImageOops}</p>
        <Button onClick={backToPage}>{messages.backButton}</Button>
      </div>
    </>
  );
};
