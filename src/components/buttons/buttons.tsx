import type { ButtonProperties } from './interfaces';

export const Button: React.FC<ButtonProperties> = ({
  className,
  label,
  onClick,
  disabled,
  type,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};
