import type { InputHTMLAttributes } from 'react';
import styles from './checkbox.module.css';
import classNames from 'classnames';

type Props = {
  label?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ label, className, ...rest }: Props) => {
  return (
    <div
      className={classNames(styles.wrapper, styles.checkboxWrapper, className)}
    >
      <label className={styles.checkboxLabel}>
        <input type="checkbox" className={styles.checkbox} {...rest} />
        {label}
      </label>
    </div>
  );
};
