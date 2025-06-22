import styles from './about-dev.module.css';
import { developers } from './developers-list';
import { messages } from './messages';

export const AboutDevelopers = () => {
  const bios = {
    [messages.developerName1]: messages.developerBio1,
    [messages.developerName2]: messages.developerBio2,
    [messages.developerName3]: messages.developerBio3,
  };

  return (
    <div className={styles.aboutDevelopersContainer}>
      <p className={styles.paragraphTitle}>{messages.titleDevelopers}</p>
      <div className={styles.developersContainer}>
        {developers.map(developer => {
          const paragraphs = bios[developer.name]
            .split('\n\n')
            .map((paragraph, index) => (
              <p className={styles.paragraph} key={index}>
                {paragraph}
              </p>
            ));
          return (
            <div key={developer.name} className={styles.developerCard}>
              <img
                className={styles.image}
                src={developer.photo}
                alt={messages.imgDeveloper}
              />
              <p className={styles.nameParagraph}>{developer.name}</p>
              <p className={styles.roleParagraph}>{developer.role}</p>
              <div className={styles.bioParagraph}>{paragraphs}</div>
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
