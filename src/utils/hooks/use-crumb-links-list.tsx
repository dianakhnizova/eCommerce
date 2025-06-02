import type { Crumb } from '../../components/bread-crumbs/links-bread-crumbs/types';
import { catalogStore } from '../../store/catalog-store';
import { useParams } from 'react-router-dom';
import { PagePath } from '../../router/enums';
import { messages } from '../../sources/messages';
import { usePageInfo } from './use-page-info';
import { useLocation } from 'react-router-dom';
import { pageTitle } from '../../router/page-title/page-title';

export const useCrumbLinksList = () => {
  const crumbs: Crumb[] = [];
  const location = useLocation();
  const currentPath = location.pathname;

  const { categorySlug, subcategorySlug } = useParams();
  const { title } = usePageInfo();

  crumbs.push({ to: PagePath.root, label: messages.homePageTitle });

  if (currentPath.startsWith(PagePath.catalogPage)) {
    crumbs.push({ to: PagePath.catalogPage, label: messages.catalogPageTitle });

    if (categorySlug) {
      const category = catalogStore.categories.find(
        cat => cat.slug?.en === categorySlug
      );
      const categoryName = category?.name?.en || categorySlug;
      crumbs.push({
        to: `${PagePath.catalogPage}/${categorySlug}`,
        label: categoryName,
      });
    }

    if (subcategorySlug) {
      const subCategory = catalogStore.categories.find(
        cat => cat.slug?.en === subcategorySlug
      );
      const subcategoryName = subCategory?.name?.en || subcategorySlug;
      crumbs.push({
        to: `${PagePath.catalogPage}/${categorySlug}/${subcategorySlug}`,
        label: subcategoryName,
      });
    }
  } else {
    const pageLabel =
      pageTitle[currentPath] || title || messages.notFoundPageTitle;
    crumbs.push({
      to: currentPath,
      label: pageLabel,
    });
  }

  return crumbs;
};
