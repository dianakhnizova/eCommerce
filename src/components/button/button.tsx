import ClassNames from 'classnames';
import styles from './button.module.css';
import { ButtonVariants } from './enums';

type Props = {
  variant: ButtonVariants;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({ variant, className, ...rest }) => {
  const primaryClass = styles.primary;
  const secondaryClass = styles.secondary;

  const buttonClass =
    variant === ButtonVariants.primary ? primaryClass : secondaryClass;
  return (
    <button
      className={ClassNames(styles.button, buttonClass, className)}
      {...rest}
    />
  );
};
