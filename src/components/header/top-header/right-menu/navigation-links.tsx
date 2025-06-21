import type { LinkItems } from '../../../../sources/types/types';
import { PagePath } from '../../../../router/enums';
import { messages } from './messages';
import { IconType } from '../../../svg-builder/enums';
import { userStore } from '../../../../store/user-store';
import { computed } from 'mobx';
import { cartStore } from '../../../../store/cart-store';

export const navigationLinks = computed<LinkItems[]>(() => {
  const totalItems =
    cartStore.cart?.lineItems.reduce((sum, item) => sum + item.quantity, 0) ??
    0;

  return userStore.isAuth
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
          totalCountItems: `(${totalItems})`,
          iconType: IconType.Cart,
          onClick: () => PagePath.catalogPage,
        },
      ]
    : [
        {
          to: PagePath.cartPage,
          label: messages.cartLink,
          totalCountItems: `${totalItems}`,
          iconType: IconType.Cart,
          onClick: () => PagePath.catalogPage,
        },
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
});
