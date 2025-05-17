import { useLocation } from 'react-router-dom';
import { pageTitle } from '../../sources/constants/page-title/bread-crumbs-title';

export const usePageInfo = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const title = pageTitle[currentPath];

  return {
    title,
  };
};
