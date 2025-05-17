import type { LinkItems } from '../../sources/types/types';
import { PagePath } from '../../router/enums';
import { messages } from './messages';
import { getLinkLabel } from './getLinkLabel';

export const getNavigationLinks = (currentPath: string): LinkItems[] => [
  {
    to: PagePath.root,
    label: messages.homeLink,
  },
  {
    to: PagePath.notFound,
    label: getLinkLabel(currentPath),
  },
];
