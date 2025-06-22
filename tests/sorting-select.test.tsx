import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SortingSelects } from '../src/pages/catalog-page/catalog/filtering/options/sorting-selects/sorting-selects';
import { catalogStore } from '../src/store/catalog-store';
import {
  SortField,
  SortOrder,
} from '../src/pages/catalog-page/catalog/filtering/options/sorting-selects/enums';
import { messages } from '../src/pages/catalog-page/catalog/filtering/options/sorting-selects/messages';

vi.mock('../src/store/catalog-store', () => {
  const {
    SortField,
    SortOrder,
  } = require('../src/pages/catalog-page/catalog/filtering/options/sorting-selects/enums');
  return {
    catalogStore: {
      sortField: SortField.Default,
      sortOrder: SortOrder.Asc,
      setSort: vi.fn(),
    },
  };
});

describe('SortingSelects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with correct initial values and options', () => {
    catalogStore.sortField = SortField.Default;
    catalogStore.sortOrder = SortOrder.Asc;

    render(<SortingSelects />);

    expect(screen.getByText(messages.sortBy)).toBeInTheDocument();

    const fieldSelect = screen.getByRole('combobox');
    expect(fieldSelect).toHaveValue(SortField.Default);

    expect(
      screen.getByRole('option', { name: messages.sortByDefault })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: messages.sortByPrice })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: messages.sortByAbc })
    ).toBeInTheDocument();

    expect(screen.queryAllByRole('combobox')).toHaveLength(1);
  });

  it('shows order select when field is not Default', () => {
    catalogStore.sortField = SortField.Price;
    catalogStore.sortOrder = SortOrder.Asc;

    render(<SortingSelects />);

    const selects = screen.getAllByRole('combobox');
    expect(selects).toHaveLength(2);
    expect(selects[0]).toHaveValue(SortField.Price);
    expect(selects[1]).toHaveValue(SortOrder.Asc);
  });

  it('calls setSort with correct args on field change', () => {
    catalogStore.sortField = SortField.Default;
    catalogStore.sortOrder = SortOrder.Asc;

    render(<SortingSelects />);

    const fieldSelect = screen.getByRole('combobox');
    fireEvent.change(fieldSelect, { target: { value: SortField.Name_en } });

    expect(catalogStore.setSort).toHaveBeenCalledWith(
      SortField.Name_en,
      SortOrder.Asc
    );
  });

  it('calls setSort with correct args on order change', () => {
    catalogStore.sortField = SortField.Price;
    catalogStore.sortOrder = SortOrder.Asc;

    render(<SortingSelects />);

    const selects = screen.getAllByRole('combobox');
    const orderSelect = selects[1];

    fireEvent.change(orderSelect, { target: { value: SortOrder.Desc } });

    expect(catalogStore.setSort).toHaveBeenCalledWith(
      SortField.Price,
      SortOrder.Desc
    );
  });
});
