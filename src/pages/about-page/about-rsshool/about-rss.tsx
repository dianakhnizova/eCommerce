import { IconType } from '../../../components/svg-builder/enums';
import { SvgBuilder } from '../../../components/svg-builder/svg-builder';
import styles from './about-rss.module.css';
import svgStyles from '../../../components/svg-builder/svg.module.css';
import { TEXT_RSS } from './constants';

export const AboutRss = () => {
  return (
    <div className={styles.aboutRssContainer}>
      <p className={styles.paragraph}>{TEXT_RSS}</p>
      <SvgBuilder iconType={IconType.LogoRss} className={svgStyles.large} />
    </div>
  );
};
