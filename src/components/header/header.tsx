import { BottomHeader } from './bottom-header/bottom-header';
import styles from './header.module.css';
import { TopHeader } from './top-header/top-header';

export const Header = () => {
  return (
    <header className={styles.header}>
      <TopHeader />
      <BottomHeader />
    </header>
  );
};
