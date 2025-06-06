import { FaArrowRight } from 'react-icons/fa';
import styles from '../product-slider.module.css';
import type { CustomArrowProps } from 'react-slick';
import classNames from 'classnames';

export const ArrowNext = ({ className, onClick }: CustomArrowProps) => {
  return (
    <button
      type="button"
      className={classNames(className, styles.arrowNext)}
      onClick={onClick}
    >
      <FaArrowRight className={styles.icon} />
    </button>
  );
};
