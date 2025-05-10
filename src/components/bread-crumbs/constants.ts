import type { LinkItems } from '../../pages/not-found-page/types';
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
