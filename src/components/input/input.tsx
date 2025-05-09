import type { InputHTMLAttributes } from 'react';
import styles from './input.module.css';
import classNames from 'classnames';

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, error, className, ...rest }: Props) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={classNames(styles.input, className, {
          [styles.error]: Boolean(error),
        })}
        {...rest}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
