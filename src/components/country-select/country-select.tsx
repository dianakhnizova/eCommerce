import styles from './country-select.module.css';
import classNames from 'classnames';
import type { CountrySelectProps } from './types.ts';
import { DEFAULT_COUNTRY_OPTION_VALUE } from './constants.ts';

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
        <option value={DEFAULT_COUNTRY_OPTION_VALUE} />
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
