import type { IconType } from '../../components/svg-builder/enums';
import type { MouseEvent } from 'react';

export type LinkItems = {
  to: string;
  label: string;
  totalCountItems?: string;
  iconType?: IconType;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export type PageTitle = Record<string, string>;
