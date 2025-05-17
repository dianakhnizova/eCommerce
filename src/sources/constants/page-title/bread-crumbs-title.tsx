import { PagePath } from '../../../router/enums';
import { messages } from './messages';
import type { PageTitle } from './types';

export const pageTitle: PageTitle = {
  [PagePath.root]: messages.mainPageTitle,
  [PagePath.aboutPage]: messages.aboutPageTitle,
  [PagePath.notFound]: messages.notFoundPageTitle,
  [PagePath.loginPage]: messages.loginPageTitle,
  [PagePath.registerPage]: messages.registerPageTitle,
  [PagePath.cartPage]: messages.cartPageTitle,
};
