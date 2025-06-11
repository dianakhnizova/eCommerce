import { IconType } from '../../../components/svg-builder/enums';
import { SvgBuilder } from '../../../components/svg-builder/svg-builder';
import styles from './about-rss.module.css';
import svgStyles from '../../../components/svg-builder/svg.module.css';
import { messages } from './messages';
import { RSSHOOL_URL } from '../../../sources/constants/common.ts';

export const AboutRss = () => {
  return (
    <div className={styles.aboutRssContainer}>
      <p className={styles.paragraph}>{messages.textRss}</p>
      <a href={RSSHOOL_URL} target="_blank" rel="noopener noreferrer">
        <SvgBuilder iconType={IconType.LogoRss} className={svgStyles.large} />
      </a>
    </div>
  );
};
