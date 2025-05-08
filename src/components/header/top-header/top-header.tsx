import styles from '../header.module.css';
import { LeftNavMenu } from './left-nav-menu';
import { RightNavMenu } from './right-nav-menu';

export const TopHeader = () => {
  return (
    <header className={styles.topHeader}>
      <LeftNavMenu />
      <RightNavMenu />
    </header>
  );
};
