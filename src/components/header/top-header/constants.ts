import type { LinkItems } from './types';
import { PagePath } from '../../../router/enums';
import { messages } from './messages';
import { IconType } from '../../svg-builder/enums';
import { OuterPath } from './enums';

const rightLinks: LinkItems[] = [
  {
    to: PagePath.registerPage,
    label: messages.registerLink,
    iconType: IconType.Registration,
    iconSize: 'small',
  },
  {
    to: PagePath.loginPage,
    label: messages.loginLink,
    iconType: IconType.Login,
    iconSize: 'small',
  },
  {
    to: PagePath.root,
    label: messages.logoutLink,
    iconType: IconType.Logout,
    iconSize: 'small',
  },
];

const leftLinks: LinkItems[] = [
  { to: OuterPath.emailPath, label: messages.emailLink },
  { to: OuterPath.phonePath, label: messages.phoneLink },
];

export { leftLinks, rightLinks };
