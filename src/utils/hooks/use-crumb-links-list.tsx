import type { Crumb } from '../../components/bread-crumbs/links-bread-crumbs/types';
import { catalogStore } from '../../store/catalog-store';
import { useParams, useLocation } from 'react-router-dom';
import { PagePath } from '../../router/enums';
import { messages } from '../../sources/messages';
import { usePageInfo } from './use-page-info';
import { pageTitle } from '../../router/page-title/page-title';
import { productStore } from '../../store/product-store';

export const useCrumbLinksList = () => {
  const crumbs: Crumb[] = [];
  const location = useLocation();
  const currentPath = location.pathname;

  const { categorySlug, subcategorySlug, id } = useParams();
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
      if (subCategory) {
        const subcategoryName = subCategory?.name?.en || subcategorySlug;
        crumbs.push({
          to: `${PagePath.catalogPage}/${categorySlug}/${subcategorySlug}`,
          label: subcategoryName,
        });
      }
    }

    if (id) {
      const productName =
        productStore.product?.name || id || messages.notFoundPageTitle;
      crumbs.push({
        to: `${PagePath.catalogPage}/${categorySlug}/${subcategorySlug}/${id}`,
        label: productName,
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
