import styles from '../header.module.css';
import { RightNavMenu } from './right-menu';
import { LeftNavMenu } from './left-menu';

export const BottomHeader = () => {
  return (
    <div className={styles.bottomHeader}>
      <LeftNavMenu />
      <RightNavMenu />
    </div>
  );
};
