import { PagePath } from '../enums';
import { messages } from '../../sources/messages';
import type { PageTitle } from '../../sources/types/types';

export const pageTitle: PageTitle = {
  [PagePath.root]: messages.titles.homePageTitle,
  [PagePath.aboutPage]: messages.titles.aboutPageTitle,
  [PagePath.notFound]: messages.titles.notFoundPageTitle,
  [PagePath.loginPage]: messages.titles.loginPageTitle,
  [PagePath.registerPage]: messages.titles.registerPageTitle,
  [PagePath.cartPage]: messages.titles.cartPageTitle,
  [PagePath.catalogPage]: messages.titles.catalogPageTitle,
  [PagePath.profilePage]: messages.titles.profilePageTitle,
};
