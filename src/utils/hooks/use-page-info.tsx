import { useLocation } from 'react-router-dom';
import { pageTitle } from '../../router/page-title/page-title';
import { PagePath } from '../../router/enums';
import { useParams } from 'react-router-dom';
import { catalogStore } from '../../store/catalog-store';
import { messages } from '../../sources/messages';

export const usePageInfo = () => {
  const { categorySlug, subcategorySlug, id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  let title = pageTitle[currentPath] || pageTitle[PagePath.notFound];

  if (currentPath.startsWith(PagePath.catalogPage)) {
    if (id) {
      const product = catalogStore.productList.find(prod => prod.id === id);
      title = product?.name || id || messages.notFoundPageTitle;
    } else if (subcategorySlug) {
      const subCategory = catalogStore.categories.find(
        cat => cat.slug?.en === subcategorySlug
      );
      title =
        subCategory?.name?.en || subcategorySlug || messages.notFoundPageTitle;
    } else if (categorySlug) {
      const category = catalogStore.categories.find(
        cat => cat.slug?.en === categorySlug
      );
      title = category?.name?.en || categorySlug || messages.notFoundPageTitle;
    } else {
      title = messages.catalogPageTitle;
    }
  }
  return {
    title,
  };
};
