import type { NavigateFunction } from 'react-router-dom';
import { catalogStore } from '../../../../../../store/catalog-store';
import { PagePath } from '../../../../../../router/enums';

export const handleCategoryChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  navigate: NavigateFunction
) => {
  const value = event.target.value;
  catalogStore.toggleCategorySelection(value || null);

  void catalogStore.getProducts();

  void navigate(
    value
      ? `${PagePath.categoryPage.replace(':categoryId', value)}`
      : PagePath.catalogPage
  );
};
