import type { LinkItems } from './types';
import { PagePath } from '../../../router/enums';
import { messages } from './messages';
import { IconType } from '../../svg-builder/enums';

const rightLinks: LinkItems[] = [
  {
    to: PagePath.loginPage,
    label: messages.loginLink,
    iconType: IconType.Login,
    iconSize: 'small',
  },
  {
    to: PagePath.registerPage,
    label: messages.registerLink,
    iconType: IconType.Registration,
    iconSize: 'small',
  },
  {
    to: PagePath.basketPage,
    label: messages.basketLink,
    iconType: IconType.Basket,
  },
];

const leftLinks: LinkItems[] = [
  { to: PagePath.notFound, label: messages.emailLink },
  { to: PagePath.notFound, label: messages.phoneLink },
];

export { leftLinks, rightLinks };
