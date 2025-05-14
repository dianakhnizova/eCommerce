import type { LinkItems } from '../../../../sources/types/types';
import { PagePath } from '../../../../router/enums';
import { messages } from './messages';
import { IconType } from '../../../svg-builder/enums';
import { userStore } from '../../../../store/user-store';
import { computed } from 'mobx';

const rightLinks = computed<LinkItems[]>(() => [
  userStore.isAuth
    ? {
        to: PagePath.root,
        label: messages.logoutLink,
        iconType: IconType.LogOut,
        onClick: () => userStore.logout(),
      }
    : {
        to: PagePath.loginPage,
        label: messages.loginLink,
        iconType: IconType.Login,
      },
  userStore.isAuth
    ? {
        to: PagePath.basketPage,
        label: messages.basketLink,
        iconType: IconType.Basket,
        onClick: () => console.log('Basket'),
      }
    : {
        to: PagePath.registerPage,
        label: messages.registerLink,
        iconType: IconType.Registration,
      },
]);

export { rightLinks };
