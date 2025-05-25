import { FaArrowLeft } from 'react-icons/fa';
import styles from '../product-page.module.css';
import type { CustomArrowProps } from 'react-slick';

export const ArrowPrev = ({ className, onClick, style }: CustomArrowProps) => {
  return (
    <button
      type="button"
      className={`${className} ${styles.arrow}`}
      onClick={onClick}
      style={style}
    >
      <FaArrowLeft className={styles.icon} />
    </button>
  );
};
