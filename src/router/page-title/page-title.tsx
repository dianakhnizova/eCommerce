import { PagePath } from '../enums';
import { messages } from '../../sources/messages';
import type { PageTitle } from '../../sources/types/types';

export const pageTitle: PageTitle = {
  [PagePath.root]: messages.mainPageTitle,
  [PagePath.aboutPage]: messages.aboutPageTitle,
  [PagePath.notFound]: messages.notFoundPageTitle,
  [PagePath.loginPage]: messages.loginPageTitle,
  [PagePath.registerPage]: messages.registerPageTitle,
  [PagePath.cartPage]: messages.cartPageTitle,
  [PagePath.catalogPage]: messages.catalogPageTitle,
  [PagePath.profilePage]: messages.profilePageTitle,
};
