import type { IconType } from '../../components/svg-builder/enums';
import type { MouseEvent } from 'react';
import type { PagePath } from '../../router/enums';

export type LinkItems = {
  to: string;
  label: string;
  iconType?: IconType;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export type PageTitle = {
  [key: string]: string;
  [PagePath.root]: string;
  [PagePath.aboutPage]: string;
  [PagePath.notFound]: string;
  [PagePath.loginPage]: string;
  [PagePath.registerPage]: string;
  [PagePath.cartPage]: string;
};
