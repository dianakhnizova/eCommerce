import { useLocation } from 'react-router-dom';
import { pageTitle } from '../../router/page-title/page-title';
import { PagePath } from '../../router/enums';

export const usePageInfo = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const title = pageTitle[currentPath] || pageTitle[PagePath.notFound];

  return {
    title,
  };
};
