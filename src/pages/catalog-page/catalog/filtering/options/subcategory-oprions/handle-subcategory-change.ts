import type { NavigateFunction } from 'react-router-dom';
import { catalogStore } from '../../../../../../store/catalog-store';
import { PagePath } from '../../../../../../router/enums';
import { generatePath } from 'react-router-dom';
import { DEFAULT_VALUE } from './enums';

export const handleSubcategoryChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  navigate: NavigateFunction
) => {
  const selectedId = event.target.value;
  if (!selectedId) {
    catalogStore.setCategories('');
    void navigate(PagePath.catalogPage);
  } else {
    catalogStore.setSubcategories(selectedId);

    const subCategory = catalogStore.categories.find(
      cat => cat.id === catalogStore.selectedSubcategoryId
    );
    const parentCategory = catalogStore.categories.find(
      cat => cat.id === subCategory?.parent?.id
    );

    const categorySlug = parentCategory?.slug?.en || DEFAULT_VALUE.CATEGORY;
    const subcategorySlug = subCategory?.slug?.en || DEFAULT_VALUE.SUBCATEGORY;

    void navigate(
      generatePath(PagePath.subCategoryPage, {
        categorySlug: categorySlug,
        subcategorySlug: subcategorySlug,
      })
    );
  }
};
