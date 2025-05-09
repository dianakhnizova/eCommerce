import styles from '../../header.module.css';
import { leftLinks } from '../constants';

export const LeftNavMenu = () => {
  return (
    <nav className={styles.navigationMenu}>
      {leftLinks.map(link => {
        return (
          <a
            key={link.label}
            href={link.to}
            className={styles.link}
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
};
