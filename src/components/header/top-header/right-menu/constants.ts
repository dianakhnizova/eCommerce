import type { LinkItems } from '../../../../sources/types/types';
import { PagePath } from '../../../../router/enums';
import { messages } from './messages';
import { IconType } from '../../../svg-builder/enums';

const rightLinks: LinkItems[] = [
  {
    to: PagePath.loginPage,
    label: messages.loginLink,
    iconType: IconType.Login,
  },
  {
    to: PagePath.registerPage,
    label: messages.registerLink,
    iconType: IconType.Registration,
  },
];

export { rightLinks };
