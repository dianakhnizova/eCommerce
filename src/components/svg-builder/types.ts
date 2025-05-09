import type { IconType } from './enums';

export type IconVariant = Record<
  IconType,
  React.FC<React.SVGProps<SVGSVGElement>>
>;
