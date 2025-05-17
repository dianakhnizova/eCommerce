import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { MainSection } from '../components/main-section/main-section';
import styles from './root.module.css';
import { Spinner } from '../components/spinner/spinner';

export const Root = () => {
  return (
    <>
      <div className={styles.root}>
        <Header />
        <MainSection />
        <Footer />
      </div>
      <Spinner isLoading={false} />
    </>
  );
};
