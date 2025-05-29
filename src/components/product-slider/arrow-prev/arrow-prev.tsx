import { FaArrowLeft } from 'react-icons/fa';
import styles from '../product-slider.module.css';
import type { CustomArrowProps } from 'react-slick';
import classNames from 'classnames';

export const ArrowPrev = ({ className, onClick }: CustomArrowProps) => {
  return (
    <button
      type="button"
      className={classNames(className, styles.arrow)}
      onClick={onClick}
    >
      <FaArrowLeft className={styles.icon} />
    </button>
  );
};
