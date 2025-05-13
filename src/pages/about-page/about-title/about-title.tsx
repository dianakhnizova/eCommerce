import { Button } from '../../../components/button/button';
import { SvgBuilder } from '../../../components/svg-builder/svg-builder';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '../../../router/enums';
import { IconType } from '../../../components/svg-builder/enums';
import { messages } from './messages';
import styles from './about-title.module.css';
import svgStyles from '../../../components/svg-builder/svg.module.css';

export const AboutTitle = () => {
  const navigate = useNavigate();

  const navigateToContacts = () => {
    void navigate(PagePath.aboutPage);
  };

  return (
    <>
      <div className={styles.aboutTopContainer}>
        <div className={styles.aboutImgContainer}>
          <SvgBuilder
            iconType={IconType.LogoMain}
            className={svgStyles.large}
          />
        </div>
        <div className={styles.aboutTitleContainer}>
          <p className={styles.paragraph}>{messages.textTitle}</p>
          <span>{messages.textAboutUs}</span>
          <Button className={styles.contactButton} onClick={navigateToContacts}>
            {messages.contactButton}
          </Button>
        </div>
      </div>
    </>
  );
};
