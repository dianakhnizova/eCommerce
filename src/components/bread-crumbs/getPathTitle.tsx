import { PagePath } from '../../router/enums';
import { messages } from '../links-bread-crumbs/messages';
import { pageTitle } from './bread-crumbs-title';
const title = pageTitle[0];

export const getPathTitle = (currentPath: string) => {
  switch (currentPath) {
    case PagePath.root: {
      return messages.homeLink;
    }
    case PagePath.aboutPage: {
      return title.aboutPage;
    }
    case PagePath.notFound: {
      return title.notFoundPage;
    }
    case PagePath.loginPage: {
      return title.loginPage;
    }
    case PagePath.registerPage: {
      return title.registerPage;
    }
    case PagePath.cartPage: {
      return title.cartPage;
    }
    default: {
      return title.notFoundPage;
    }
  }
};
