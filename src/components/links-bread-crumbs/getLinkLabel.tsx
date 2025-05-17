import { PagePath } from '../../router/enums';
import { messages } from './messages';

export const getLinkLabel = (currentPath: string) => {
  switch (currentPath) {
    case PagePath.root: {
      return messages.homeLink;
    }
    case PagePath.aboutPage: {
      return messages.aboutLink;
    }
    case PagePath.notFound: {
      return messages.notFoundLink;
    }
    case PagePath.loginPage: {
      return messages.loginLink;
    }
    case PagePath.registerPage: {
      return messages.registerLink;
    }
    case PagePath.cartPage: {
      return messages.cartLink;
    }
    default: {
      return messages.notFoundLink;
    }
  }
};
