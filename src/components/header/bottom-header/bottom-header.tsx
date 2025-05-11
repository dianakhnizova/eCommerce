import styles from './bottom-header.module.css';
import { RightNavMenu } from './right-menu/right-menu';
import { LeftNavMenu } from './left-menu/left-menu';
import { Wrapper } from '../../wrapper/wrapper';

export const BottomHeader = () => {
  return (
    <div className={styles.bottomHeader}>
      <Wrapper className={styles.bottomWrapper}>
        <LeftNavMenu />
        <RightNavMenu />
      </Wrapper>
    </div>
  );
};
