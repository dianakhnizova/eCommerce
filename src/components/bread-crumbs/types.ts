import type { PagePath } from '../../router/enums';

export type PageTitle = {
  [key: string]: string;
  [PagePath.root]: string;
  [PagePath.aboutPage]: string;
  [PagePath.notFound]: string;
  [PagePath.loginPage]: string;
  [PagePath.registerPage]: string;
  [PagePath.cartPage]: string;
};
