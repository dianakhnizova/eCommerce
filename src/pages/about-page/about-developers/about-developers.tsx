import styles from './about-dev.module.css';
import { developers } from './constants';
import { messages } from './messages';

export const AboutDevelopers = () => {
  return (
    <div className={styles.aboutDevelopersContainer}>
      <p className={styles.paragraph}>{messages.titleDevelopers}</p>
      <div className={styles.developersContainer}>
        {developers.map(developer => {
          return (
            <div className={styles.developerCard}>
              <img
                className={styles.image}
                src={developer.photo}
                alt={messages.imgDeveloper}
              />
              <p className={styles.nameParagraph}>{developer.name}</p>
              <p className={styles.roleParagraph}>{developer.role}</p>
              <span className={styles.bioParagraph}>{developer.bio}</span>
              <a
                href={developer.gitHub}
                target="_blank"
                rel="noopener noreferrer"
              >
                {developer.gitHub}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
