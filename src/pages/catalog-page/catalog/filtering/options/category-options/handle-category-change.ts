import type { NavigateFunction } from 'react-router-dom';
import { catalogStore } from '../../../../../../store/catalog-store';
import { PagePath } from '../../../../../../router/enums';
import { generatePath } from 'react-router-dom';
import { DEFAULT_VALUE } from './enums';

export const handleCategoryChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  navigate: NavigateFunction
) => {
  const selectedId = event.target.value;
  if (!selectedId) {
    catalogStore.setCategories('');
    void navigate(PagePath.catalogPage);
  } else {
    catalogStore.setCategories(selectedId);

    const category = catalogStore.categories.find(cat => cat.id === selectedId);

    const slug = category?.slug?.en || DEFAULT_VALUE.CATEGORY;
    void navigate(generatePath(PagePath.categoryPage, { categorySlug: slug }));
  }
};
