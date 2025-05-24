import { useLocation, matchPath } from 'react-router-dom';
import { pageTitle } from '../../router/page-title/page-title';
import { PagePath } from '../../router/enums';

export const usePageInfo = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  let title = pageTitle[PagePath.notFound];

  if (matchPath({ path: PagePath.root, end: true }, currentPath)) {
    title = pageTitle[PagePath.root];
  } else if (matchPath({ path: PagePath.aboutPage, end: true }, currentPath)) {
    title = pageTitle[PagePath.aboutPage];
  } else if (
    matchPath({ path: PagePath.catalogPage, end: true }, currentPath)
  ) {
    title = pageTitle[PagePath.catalogPage];
  } else if (
    matchPath({ path: `${PagePath.catalogPage}/:id`, end: true }, currentPath)
  ) {
    title = pageTitle[PagePath.productPage];
  }

  return { title };
};
