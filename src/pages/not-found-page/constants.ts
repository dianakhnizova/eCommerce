import type { LinkItems } from './types';
import { PagePath } from '../../router/enums';
import { messages } from './messages';

const navigationLinks: LinkItems[] = [
  {
    to: PagePath.root,
    label: messages.homeLink,
  },
  {
    to: PagePath.root,
    label: messages.pagesLink,
  },
  {
    to: PagePath.notFound,
    label: messages.notFoundLink,
  },
];

export { navigationLinks };
