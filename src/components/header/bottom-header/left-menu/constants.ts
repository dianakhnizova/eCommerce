import type { LinkItems } from '../../../../sources/types/types';
import { PagePath } from '../../../../router/enums';
import { messages } from '../messages';

const leftLinks: LinkItems[] = [
  {
    to: PagePath.root,
    label: messages.homeLink,
  },
  {
    to: PagePath.aboutPage,
    label: messages.aboutLink,
  },
];

export { leftLinks };
