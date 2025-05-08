import type { FC } from 'react';
import styles from './svg.module.css';
import LoginIcon from '../../../assets/icons/login.svg?react';
import RegisterIcon from '../../../assets/icons/register.svg?react';
import BasketIcon from '../../../assets/icons/basket.svg?react';
import type { IconType } from './enums';

type Props = {
  iconType?: IconType;
  className?: string;
};

const iconVariant: Record<
  NonNullable<Props['iconType']>,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  login: LoginIcon,
  registration: RegisterIcon,
  basket: BasketIcon,
};

export const SvgBuilder: FC<Props> = ({ iconType, className }) => {
  if (!iconType) {
    return undefined;
  }

  const IconComponent = iconVariant[iconType];

  if (!IconComponent) {
    return undefined;
  }

  return (
    <span className={styles.iconWrapper}>
      <IconComponent className={className} />
    </span>
  );
};
