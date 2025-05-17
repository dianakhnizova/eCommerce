import type { LinkItems } from '../../../../sources/types/types';
import { PagePath } from '../../../../router/enums';
import { messages } from './messages';
import { IconType } from '../../../svg-builder/enums';
import { userStore } from '../../../../store/user-store';
import { computed } from 'mobx';

export const navigationLinks = computed<LinkItems[]>(() =>
  userStore.isAuth
    ? [
        {
          to: PagePath.root,
          label: messages.logoutLink,
          iconType: IconType.LogOut,
          onClick: () => userStore.logout(),
        },
        {
          to: PagePath.cartPage,
          label: messages.cartLink,
          iconType: IconType.Cart,
          onClick: () => console.log('Cart'),
        },
      ]
    : [
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
      ]
);
