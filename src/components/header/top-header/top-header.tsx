import styles from './top-header.module.css';
import { RightNavMenu } from './right-menu/right-nav-menu';
import { LeftNavMenu } from './left-menu/left-nav-menu';
import { Wrapper } from '../../wrapper/wrapper';

export const TopHeader = () => {
  return (
    <div className={styles.topHeader}>
      <Wrapper className={styles.topWrapper}>
        <LeftNavMenu />
        <RightNavMenu />
      </Wrapper>
    </div>
  );
};
