import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { MainSection } from '../components/main-section/main-section';
import styles from './root.module.css';
import { Spinner } from '../components/spinner/spinner';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { userStore } from '../store/user-store';

export const Root = observer(() => {
  useEffect(() => {
    void userStore.init();
  }, []);

  return (
    <>
      <div className={styles.root}>
        <Header />
        <MainSection />
        <Footer />
      </div>
      <Spinner isInitLoading={userStore.isInitLoading} />
    </>
  );
});
