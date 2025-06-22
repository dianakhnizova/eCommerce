import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleSubcategoryChange } from '../src/pages/catalog-page/catalog/filtering/options/subcategory-options/handle-subcategory-change';
import { catalogStore } from '../src/store/catalog-store';
import { generatePath } from 'react-router-dom';
import { PagePath } from '../src/router/enums';
import { DEFAULT_VALUE } from '../src/sources/enums/default-values';

describe('handleSubcategoryChange', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    catalogStore.categories = [
      {
        id: 'cat1',
        typeId: 'type1',
        slug: { en: 'category-1' },
        parent: undefined,
      },
      {
        id: 'sub1',
        typeId: 'type2',
        slug: { en: 'subcategory-1' },
        parent: { id: 'cat1', typeId: 'type1' },
      },
    ];
    catalogStore.selectedCategoryId = 'cat1';
  });

  it('navigates to category page if no subcategory selected', () => {
    const event = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLSelectElement>;

    handleSubcategoryChange(event, mockNavigate);

    const expectedPath = generatePath(PagePath.categoryPage, {
      categorySlug: 'category-1',
    });
    expect(mockNavigate).toHaveBeenCalledWith(expectedPath);
  });

  it('navigates to subcategory page with correct slugs if subcategory selected', () => {
    const event = {
      target: { value: 'sub1' },
    } as React.ChangeEvent<HTMLSelectElement>;

    handleSubcategoryChange(event, mockNavigate);

    const expectedPath = generatePath(PagePath.subCategoryPage, {
      categorySlug: 'category-1',
      subcategorySlug: 'subcategory-1',
    });
    expect(mockNavigate).toHaveBeenCalledWith(expectedPath);
  });

  it('uses DEFAULT_VALUEs if slugs not found', () => {
    catalogStore.categories = [
      {
        id: 'cat2',
        typeId: 'someTypeId',
      },
      {
        id: 'sub2',
        typeId: 'someTypeId',
        parent: { id: 'cat2', typeId: 'type1' },
      },
    ];
    catalogStore.selectedCategoryId = 'cat2';

    const event = {
      target: { value: 'sub2' },
    } as React.ChangeEvent<HTMLSelectElement>;

    handleSubcategoryChange(event, mockNavigate);

    const expectedPath = generatePath(PagePath.subCategoryPage, {
      categorySlug: DEFAULT_VALUE.CATEGORY,
      subcategorySlug: DEFAULT_VALUE.SUBCATEGORY,
    });

    expect(mockNavigate).toHaveBeenCalledWith(expectedPath);
  });
});
