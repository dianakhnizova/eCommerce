import { navigationLinks } from './constants';
import { messages } from './messages';
import styles from './not-found.module.css';
import { NavLink } from 'react-router';

export const NotFoundPage = () => {
  return (
    <>
      <div className={styles.errorMessageContainer}>
        <h2 className={styles.errorTitle}>{messages.errorMessage}</h2>
        <div className={styles.linkContainer}>
          {navigationLinks.map(link => {
            return (
              <NavLink key={link.label} to={link.to} className={styles.link}>
                {link.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};
