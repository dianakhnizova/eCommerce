import type { SelectHTMLAttributes } from 'react';
import styles from './country-select.module.css';
import classNames from 'classnames';

type Option = {
  value: string;
  label: string;
};

type CountrySelectProps = {
  label?: string;
  error?: string;
  options: Option[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export const CountrySelect = ({
  label,
  error,
  className,
  options,
  ...rest
}: CountrySelectProps) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={classNames(styles.select, className, {
          [styles.error]: Boolean(error),
        })}
        {...rest}
      >
        <option value="">Select a country</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
