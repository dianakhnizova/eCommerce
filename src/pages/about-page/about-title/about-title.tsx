import { SvgBuilder } from '../../../components/svg-builder/svg-builder';
import { IconType } from '../../../components/svg-builder/enums';
import styles from './about-title.module.css';
import svgStyles from '../../../components/svg-builder/svg.module.css';
import { messages } from '../../../sources/messages';

export const AboutTitle = () => {
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
          <p className={styles.paragraph}>{messages.titles.aboutUsPageTitle}</p>
          <span>{messages.textAboutUs}</span>
        </div>
      </div>
    </>
  );
};
