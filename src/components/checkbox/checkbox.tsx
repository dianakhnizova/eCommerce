import type { InputHTMLAttributes } from 'react';
import styles from './checkbox.module.css';
import classNames from 'classnames';

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ label, ...rest }: Props) => {
  return (
    <div className={classNames(styles.wrapper, styles.checkboxWrapper)}>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" className={styles.checkbox} {...rest} />
        {label}
      </label>
    </div>
  );
};
