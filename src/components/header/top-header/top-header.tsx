import styles from '../header.module.css';
import { LeftNavMenu } from './left-nav-menu';
import { RightNavMenu } from './right-nav-menu';

export const TopHeader = () => {
  return (
    <div className={styles.topHeader}>
      <LeftNavMenu />
      <RightNavMenu />
    </div>
  );
};
