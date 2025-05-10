import { Button } from '../../components/button/button';
import { PATH_TO_IMG_NOTFOUND, PATH_TO_IMG_OOPS } from './constants';
import { messages } from './messages';
import styles from './not-found.module.css';
import { useNavigate } from 'react-router-dom';
import { ButtonVariants } from '../../components/button/enums';
import { PagePath } from '../../router/enums';
import { Wrapper } from '../../components/wrapper/wrapper';
import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const backToPage = () => {
    void navigate(PagePath.root);
  };

  return (
    <>
      <div className={styles.errorMessageContainer}>
        <Wrapper className={styles.errorWrapper}>
          <h2 className={styles.errorTitle}>{messages.errorMessage}</h2>
          <BreadCrumbs />
        </Wrapper>
      </div>

      <div className={styles.mainContainer}>
        <img
          className={styles.imgNotFound}
          src={PATH_TO_IMG_NOTFOUND}
          alt={messages.errorMessage}
        />
        <img
          src={PATH_TO_IMG_OOPS}
          alt={messages.oopsMessage}
          className={styles.oopsImg}
        />

        <Button
          variant={ButtonVariants.primary}
          className={styles.backButton}
          onClick={backToPage}
        >
          {messages.backButton}
        </Button>
      </div>
    </>
  );
};
