import type { NavigateFunction } from 'react-router-dom';
import { catalogStore } from '../../../../../../store/catalog-store';
import { PagePath } from '../../../../../../router/enums';
import { messages } from './messages';

export const handleCategoryChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  navigate: NavigateFunction
) => {
  const selectedId = event.target.value;
  if (selectedId === messages.defaultTitle) {
    catalogStore.setCategories('');
    void catalogStore.getProducts();
    void navigate('/catalog');
  } else {
    catalogStore.setCategories(selectedId);
    void catalogStore.getProducts();

    void navigate(
      selectedId
        ? `${PagePath.categoryPage.replace(':categoryId', selectedId)}`
        : PagePath.catalogPage
    );
  }
};
