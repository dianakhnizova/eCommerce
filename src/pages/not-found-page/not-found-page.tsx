import { Button } from '../../components/button/button';
import {
  navigationLinks,
  PATH_TO_IMG_NOTFOUND,
  PATH_TO_IMG_OOPS,
} from './constants';
import { messages } from './messages';
import styles from './not-found.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ButtonVariants } from '../../components/button/enums';
import { PagePath } from '../../router/enums';
import classNames from 'classnames';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const backToPage = () => {
    void navigate(PagePath.root);
  };

  return (
    <>
      <div className={styles.errorMessageContainer}>
        <h2 className={styles.errorTitle}>{messages.errorMessage}</h2>
        <div className={styles.linkContainer}>
          {navigationLinks.map((link, index) => {
            const isLastLink = index === navigationLinks.length - 1;
            return (
              <NavLink
                key={link.label}
                to={link.to}
                className={classNames(
                  styles.link,
                  isLastLink && styles.activeLink
                )}
              >
                {link.label}
              </NavLink>
            );
          })}
        </div>
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
