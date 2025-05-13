import type { LinkItems } from '../../sources/types/types';
import { PagePath } from '../../router/enums';
import { messages } from './messages';

const navigationLinks: LinkItems[] = [
  {
    to: PagePath.root,
    label: messages.homeLink,
  },
  {
    to: PagePath.notFound,
    label: messages.notFoundLink,
  },
];

export { navigationLinks };
