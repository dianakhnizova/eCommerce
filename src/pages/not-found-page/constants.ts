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

const PATH_TO_IMG_NOTFOUND = '../../../assets/images/not-found.png';
const PATH_TO_IMG_OOPS = '../../../assets/images/oops.png';

export { navigationLinks, PATH_TO_IMG_NOTFOUND, PATH_TO_IMG_OOPS };
