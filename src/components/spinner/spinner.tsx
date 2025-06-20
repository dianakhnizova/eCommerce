import { messages } from '../../sources/messages';
import { IconType } from '../svg-builder/enums';
import { SvgBuilder } from '../svg-builder/svg-builder';
import styles from './spinner.module.css';

type Props = {
  isLoading: boolean;
};

export const Spinner = ({ isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.sceneAnimation}>
        <div className={styles.ball}>
          <SvgBuilder iconType={IconType.LogoAnimate} className={styles.icon} />
        </div>
      </div>
      <h2 className={styles.loadingTitle}>{messages.titles.loadingTitle}</h2>
    </div>
  );
};
