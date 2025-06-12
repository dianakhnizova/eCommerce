import type { LinkItems } from '../../../../sources/types/types';
import { PagePath } from '../../../../router/enums';
import { messages } from './messages';
import { IconType } from '../../../svg-builder/enums';
import { userStore } from '../../../../store/user-store';
import { computed } from 'mobx';
import { cartStore } from '../../../../store/cart-store';
import { CURRENCY_USD } from '../../../../sources/constants/catalog';

export const navigationLinks = computed<LinkItems[]>(() => {
  const totalCoast = `${CURRENCY_USD}${(cartStore.cart?.totalPrice.centAmount ?? 0) / 100}`;

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
          data: totalCoast,
          iconType: IconType.Cart,
          onClick: () => PagePath.catalogPage,
        },
      ]
    : [
        {
          to: PagePath.cartPage,
          label: messages.cartLink,
          data: totalCoast,
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
