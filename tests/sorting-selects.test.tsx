import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import {
  SortField,
  SortOrder,
} from '../src/pages/catalog-page/catalog/filtering/options/sorting-selects/enums';
import { messages } from '../src/pages/catalog-page/catalog/filtering/options/sorting-selects/messages';
import { catalogStore } from '../src/store/catalog-store';

vi.mock('../src/store/catalog-store', () => ({
  catalogStore: {
    sortField: SortField.Default,
    sortOrder: SortOrder.Asc,
    setSort: vi.fn(),
  },
}));

import { SortingSelects } from '../src/pages/catalog-page/catalog/filtering/options/sorting-selects/sorting-selects';

describe('SortingSelects', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('renders select options with default values', () => {
    render(<SortingSelects />);
    expect(screen.getByText(messages.sortBy)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(messages.sortByDefault)
    ).toBeInTheDocument();
  });

  it('calls setSort with Price and Asc when selecting Price', () => {
    const spy = vi.spyOn(catalogStore, 'setSort');
    render(<SortingSelects />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: SortField.Price } });

    expect(spy).toHaveBeenCalledWith(SortField.Price, SortOrder.Asc);
  });

  it('calls setSort with Name_en and Asc when selecting Name_en', () => {
    const spy = vi.spyOn(catalogStore, 'setSort');
    render(<SortingSelects />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: SortField.Name_en } });

    expect(spy).toHaveBeenCalledWith(SortField.Name_en, SortOrder.Asc);
  });

  it('calls setSort with Default and Asc when selecting Default', () => {
    const spy = vi.spyOn(catalogStore, 'setSort');
    render(<SortingSelects />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: SortField.Default } });

    expect(spy).toHaveBeenCalledWith(SortField.Default, SortOrder.Asc);
  });

  it('calls setSort with Desc order when selecting Desc', () => {
    catalogStore.sortField = SortField.Price;
    catalogStore.sortOrder = SortOrder.Asc;
    catalogStore.setSort = vi.fn();

    render(<SortingSelects />);
    const selects = screen.getAllByRole('combobox');
    const orderSelect = selects[1];

    fireEvent.change(orderSelect, { target: { value: SortOrder.Desc } });

    expect(catalogStore.setSort).toHaveBeenCalledWith(
      SortField.Price,
      SortOrder.Desc
    );
  });

  it('calls setSort with Asc order when selecting Asc', () => {
    catalogStore.sortField = SortField.Price;
    catalogStore.sortOrder = SortOrder.Desc;
    catalogStore.setSort = vi.fn();

    render(<SortingSelects />);
    const selects = screen.getAllByRole('combobox');
    const orderSelect = selects[1];

    fireEvent.change(orderSelect, { target: { value: SortOrder.Asc } });

    expect(catalogStore.setSort).toHaveBeenCalledWith(
      SortField.Price,
      SortOrder.Asc
    );
  });
});
