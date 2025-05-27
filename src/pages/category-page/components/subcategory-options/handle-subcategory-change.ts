import { PagePath } from '../../../../router/enums';
import { catalogStore } from '../../../../store/catalog-store';
import type { NavigateFunction } from 'react-router-dom';

export const handleSubCategoryChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  navigate: NavigateFunction
) => {
  const value = event.target.value;
  catalogStore.toggleCategorySelection(value || null);

  void catalogStore.getProducts();

  void navigate(
    value
      ? `${PagePath.categoryPage.replace(':categoryId/:subcategoryId', value)}`
      : PagePath.catalogPage
  );
};
