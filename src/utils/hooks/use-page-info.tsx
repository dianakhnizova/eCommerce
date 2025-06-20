import { useLocation } from 'react-router-dom';
import { pageTitle } from '../../router/page-title/page-title';
import { PagePath } from '../../router/enums';
import { useParams } from 'react-router-dom';
import { catalogStore } from '../../store/catalog-store';
import { messages } from '../../sources/messages';
import { productStore } from '../../store/product-store';

export const usePageInfo = () => {
  const { categorySlug, subcategorySlug, id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  let title = pageTitle[currentPath] || pageTitle[PagePath.notFound];

  if (currentPath.startsWith(PagePath.catalogPage)) {
    if (id) {
      const productName = productStore.product?.name;
      title = productName || id || messages.titles.notFoundPageTitle;
    } else if (subcategorySlug) {
      const subCategory = catalogStore.categories.find(
        cat => cat.slug?.en === subcategorySlug
      );
      if (subCategory) {
        title =
          subCategory?.name?.en ||
          subcategorySlug ||
          messages.titles.notFoundPageTitle;
      } else {
        const category = catalogStore.categories.find(
          cat => cat.slug?.en === categorySlug
        );
        title =
          category?.name?.en ||
          categorySlug ||
          messages.titles.notFoundPageTitle;
      }
    } else if (categorySlug) {
      const category = catalogStore.categories.find(
        cat => cat.slug?.en === categorySlug
      );
      title =
        category?.name?.en || categorySlug || messages.titles.notFoundPageTitle;
    } else {
      title = messages.titles.catalogPageTitle;
    }
  }
  return {
    title,
  };
};
