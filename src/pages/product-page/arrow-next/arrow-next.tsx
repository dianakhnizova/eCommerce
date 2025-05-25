import { FaArrowRight } from 'react-icons/fa';
import styles from '../product-page.module.css';
import type { CustomArrowProps } from 'react-slick';

export const ArrowNext = ({ className, onClick, style }: CustomArrowProps) => {
  return (
    <button
      type="button"
      className={`${className} ${styles.arrow}`}
      onClick={onClick}
      style={style}
    >
      <FaArrowRight className={styles.icon} />
    </button>
  );
};
