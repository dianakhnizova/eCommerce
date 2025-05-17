import styles from './about-page.module.css';
import { Wrapper } from '../../components/wrapper/wrapper';
import { AboutTitle } from './about-title/about-title';
import { AboutDevelopers } from './about-developers/about-developers';
import { AboutRss } from './about-rsshool/about-rss';
import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';

export const AboutPage = () => {
  return (
    <>
      <BreadCrumbs />
      <Wrapper className={styles.aboutWrapper}>
        <AboutTitle />
        <AboutDevelopers />
        <AboutRss />
      </Wrapper>
    </>
  );
};
