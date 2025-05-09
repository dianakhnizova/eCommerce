import styles from './top-header.module.css';
import { LeftNavMenu } from './left-menu/left-nav-menu';
import { RightNavMenu } from './right-menu/right-nav-menu';

export const TopHeader = () => {
  return (
    <div className={styles.topHeader}>
      <LeftNavMenu />
      <RightNavMenu />
    </div>
  );
};
