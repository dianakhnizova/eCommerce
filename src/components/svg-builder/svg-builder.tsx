import type { FC } from 'react';
import styles from './svg.module.css';
import LoginIcon from '../../../assets/icons/login.svg?react';
import SignUp from '../../../assets/icons/signup.svg?react';
import LogoIcon from '../../../assets/logo.svg?react';
import SearchIcon from '../../../assets/icons/search.svg?react';
import type { IconType } from './enums';
import type { IconVariant } from './types';

type Props = {
  iconType?: IconType;
  className?: string;
};

const iconVariant: IconVariant = {
  login: LoginIcon,
  registration: SignUp,
  logo: LogoIcon,
  search: SearchIcon,
};

export const SvgBuilder: FC<Props> = ({ iconType, className }) => {
  if (!iconType) {
    return null;
  }

  const IconComponent = iconVariant[iconType];

  if (!IconComponent) {
    return null;
  }

  return (
    <span className={styles.iconWrapper}>
      <IconComponent className={className} />
    </span>
  );
};
