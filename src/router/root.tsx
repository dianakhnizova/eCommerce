import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { MainSection } from '../components/main-section/main-section';
import styles from './root.module.css';
import { Spinner } from '../components/spinner/spinner';
import { observer } from 'mobx-react-lite';
import { userStore } from '../store/user-store';

export const Root = observer(() => {
  return (
    <>
      <div className={styles.root}>
        <Header />
        <MainSection />
        <Footer />
      </div>
      <Spinner isLoading={userStore.isInitLoading} />
    </>
  );
});
