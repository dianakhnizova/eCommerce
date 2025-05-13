import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { MainSection } from '../components/main-section/main-section';
import styles from './root.module.css';

export const Root = () => {
  return (
    <>
      <div className={styles.root}>
        <Header />
        <MainSection />
        <Footer />
      </div>
    </>
  );
};
