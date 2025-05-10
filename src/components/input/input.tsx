import type { InputHTMLAttributes } from 'react';
import { useState } from 'react';
import styles from './input.module.css';
import classNames from 'classnames';
import { Eye, EyeOff } from 'lucide-react';
import { messages } from './messages.ts';

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, error, className, type, ...rest }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          type={inputType}
          className={classNames(styles.input, className, {
            [styles.error]: Boolean(error),
          })}
          {...rest}
        />
        {isPasswordType && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={
              showPassword
                ? messages.hidePasswordText
                : messages.showPasswordText
            }
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
