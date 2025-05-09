import type { LinkItems } from './types';
import { PagePath } from '../../../router/enums';
import { messages } from './messages';
import { IconType } from '../../svg-builder/enums';
import { OuterPath } from './left-menu/enums';

const rightLinks: LinkItems[] = [
  {
    to: PagePath.registerPage,
    label: messages.registerLink,
    iconType: IconType.Registration,
  },
  {
    to: PagePath.loginPage,
    label: messages.loginLink,
    iconType: IconType.Login,
  },
];

const leftLinks: LinkItems[] = [
  { to: OuterPath.emailPath, label: messages.emailLink },
  { to: OuterPath.phonePath, label: messages.phoneLink },
];

export { leftLinks, rightLinks };
