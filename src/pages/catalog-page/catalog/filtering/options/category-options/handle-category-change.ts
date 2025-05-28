import type { NavigateFunction } from 'react-router-dom';
import { catalogStore } from '../../../../../../store/catalog-store';
import { PagePath } from '../../../../../../router/enums';
import { messages } from './messages';

export const handleCategoryChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  navigate: NavigateFunction
) => {
  const selectedSlug = event.target.value;
  console.log('Selected slug:', selectedSlug);
  if (selectedSlug === messages.defaultTitle) {
    catalogStore.setCategories('');
    void navigate('/catalog');
  } else {
    catalogStore.setCategories(selectedSlug);
    void catalogStore.getProducts();

    void navigate(
      selectedSlug
        ? `${PagePath.categoryPage.replace(':categorySlug', selectedSlug)}`
        : PagePath.catalogPage
    );
  }
};
