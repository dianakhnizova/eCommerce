import type { LinkItems } from '../top-header/types';
import { PagePath } from '../../../router/enums';
import { messages } from './messages';

const leftLinks: LinkItems[] = [
  {
    to: PagePath.root,
    label: messages.homeLink,
  },
  {
    to: PagePath.registerPage,
    label: messages.pagesLink,
  },
  {
    to: PagePath.basketPage,
    label: messages.productsLink,
  },
  {
    to: PagePath.root,
    label: messages.blogLink,
  },
  {
    to: PagePath.basketPage,
    label: messages.shopLink,
  },
  {
    to: PagePath.aboutPage,
    label: messages.contactsLink,
  },
];

export { leftLinks };
