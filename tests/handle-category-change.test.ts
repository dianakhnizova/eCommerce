import type { NavigateFunction } from 'react-router-dom';
import { handleCategoryChange } from '../src/pages/catalog-page/catalog/filtering/options/category-options/handle-category-change';
import { catalogStore } from '../src/store/catalog-store';
import { PagePath } from '../src/router/enums';
import { DEFAULT_VALUE } from '../src/sources/enums/default-values';
import { vi } from 'vitest';

describe('handleCategoryChange', () => {
  const mockNavigate = vi.fn() as NavigateFunction;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('navigates to catalog page when selectedId is empty', () => {
    const event = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLSelectElement>;

    handleCategoryChange(event, mockNavigate);

    expect(mockNavigate).toHaveBeenCalledWith(PagePath.catalogPage);
  });

  it('navigates to category page with slug if category found', () => {
    const event = {
      target: { value: '123' },
    } as React.ChangeEvent<HTMLSelectElement>;

    catalogStore.categories = [
      {
        id: '123',
        typeId: 'type1',
        slug: { en: 'my-category' },
        name: { en: 'My Category' },
      },
    ];

    handleCategoryChange(event, mockNavigate);

    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringContaining('/catalog/my-category')
    );
  });

  it('navigates with default slug if category slug missing', () => {
    const event = {
      target: { value: '456' },
    } as React.ChangeEvent<HTMLSelectElement>;

    catalogStore.categories = [
      {
        id: '456',
        typeId: 'type2',
        slug: {},
        name: { en: 'Other Category' },
      },
    ];

    handleCategoryChange(event, mockNavigate);

    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringContaining(DEFAULT_VALUE.CATEGORY)
    );
  });
});
