import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { MainSection } from '../components/main-section/main-section';
import styles from './root.module.css';
import { BreadCrumbs } from '../components/bread-crumbs/bread-crumbs';

export const Root = () => {
  return (
    <>
      <div className={styles.root}>
        <Header />
        <BreadCrumbs />
        <MainSection />
        <Footer />
      </div>
    </>
  );
};
