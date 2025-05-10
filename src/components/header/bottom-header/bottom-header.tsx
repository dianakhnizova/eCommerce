import styles from './bottom-header.module.css';
import { RightNavMenu } from './right-menu/right-menu';
import { LeftNavMenu } from './left-menu/left-menu';
import { Wrapper } from '../../wrapper/wrapper';

export const BottomHeader = () => {
  return (
    <Wrapper className={styles.bottomWrapper}>
      <div className={styles.bottomHeader}>
        <LeftNavMenu />
        <RightNavMenu />
      </div>
    </Wrapper>
  );
};
