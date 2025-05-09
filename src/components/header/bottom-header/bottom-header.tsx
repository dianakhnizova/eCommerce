import styles from './bottom-header.module.css';
import { RightNavMenu } from './right-menu/right-menu';
import { LeftNavMenu } from './left-menu/left-menu';

export const BottomHeader = () => {
  return (
    <div className={styles.bottomHeader}>
      <LeftNavMenu />
      <RightNavMenu />
    </div>
  );
};
