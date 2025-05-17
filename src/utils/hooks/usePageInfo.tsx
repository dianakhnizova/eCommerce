import { useLocation } from 'react-router-dom';
import { pageTitle } from '../../components/bread-crumbs/bread-crumbs-title';

export const usePageInfo = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const title = pageTitle[currentPath];

  return {
    title,
  };
};
