import type { FC } from 'react';
import styles from './svg.module.css';
import LoginIcon from '../../../assets/icons/login.svg?react';
import SignUp from '../../../assets/icons/signup.svg?react';
import LogoHeaderIcon from '../../../assets/logo/logo.svg?react';
import LogoMainIcon from '../../../assets/logo/logo-2.svg?react';
import LogoRss from '../../../assets/logo/logo-rss.svg?react';
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
  logoHeader: LogoHeaderIcon,
  logoMain: LogoMainIcon,
  logoRss: LogoRss,
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
