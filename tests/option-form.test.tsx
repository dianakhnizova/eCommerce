import { render, screen } from '@testing-library/react';
import { OptionForm } from '../src/pages/catalog-page/catalog/filtering/options/option-form';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock(
  '../src/pages/catalog-page/catalog/filtering/options/sorting-selects/sorting-selects',
  () => ({
    SortingSelects: () => (
      <div data-testid="sorting-selects">SortingSelects</div>
    ),
  })
);

vi.mock(
  '../src/pages/catalog-page/catalog/filtering/options/category-options/category-options',
  () => ({
    CategoryOptions: () => (
      <div data-testid="category-options">CategoryOptions</div>
    ),
  })
);

vi.mock(
  '../src/pages/catalog-page/catalog/filtering/options/subcategory-options/subcategory-options',
  () => ({
    SubcategoryOptions: () => (
      <div data-testid="subcategory-options">SubcategoryOptions</div>
    ),
  })
);

vi.mock(
  '../src/pages/catalog-page/catalog/filtering/options/color-options/color-options',
  () => ({
    ColorOptions: () => <div data-testid="color-options">ColorOptions</div>,
  })
);

vi.mock(
  '../src/pages/catalog-page/catalog/filtering/options/size-options/size-options',
  () => ({
    SizeOptions: () => <div data-testid="size-options">SizeOptions</div>,
  })
);

vi.mock(
  '../src/pages/catalog-page/catalog/filtering/options/price-options/price-options',
  () => ({
    PriceOptions: () => <div data-testid="price-options">PriceOptions</div>,
  })
);

describe('OptionForm', () => {
  it('renders all filter option components', () => {
    render(
      <MemoryRouter>
        <OptionForm />
      </MemoryRouter>
    );

    expect(screen.getByTestId('sorting-selects')).toBeInTheDocument();
    expect(screen.getByTestId('category-options')).toBeInTheDocument();
    expect(screen.getByTestId('subcategory-options')).toBeInTheDocument();
    expect(screen.getByTestId('color-options')).toBeInTheDocument();
    expect(screen.getByTestId('size-options')).toBeInTheDocument();
    expect(screen.getByTestId('price-options')).toBeInTheDocument();
  });
});
