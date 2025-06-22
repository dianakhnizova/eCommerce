import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SizeOptions } from '../src/pages/catalog-page/catalog/filtering/options/size-options/size-options';
import { catalogStore } from '../src/store/catalog-store';
import { messages } from '../src/sources/messages';

vi.mock('../src/store/catalog-store', () => ({
  catalogStore: {
    sizeList: ['S', 'M', 'L'],
    selectedSizes: [],
  },
}));

vi.mock(
  '../src/pages/catalog-page/catalog/filtering/options/size-options/handle-size-change',
  () => ({
    handleSizeChange: vi.fn(),
  })
);

import { handleSizeChange } from '../src/pages/catalog-page/catalog/filtering/options/size-options/handle-size-change';

describe('SizeOptions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correct title and size options', () => {
    catalogStore.sizeList = ['S', 'M', 'L'];
    catalogStore.selectedSizes = ['M'];

    render(<SizeOptions />);

    expect(screen.getByText(messages.titles.sizeTitle)).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);

    expect(screen.getByLabelText('S')).not.toBeChecked();
    expect(screen.getByLabelText('M')).toBeChecked();
    expect(screen.getByLabelText('L')).not.toBeChecked();
  });

  it('calls handleSizeChange when checkbox is clicked', () => {
    catalogStore.sizeList = ['S'];
    catalogStore.selectedSizes = [];

    render(<SizeOptions />);

    const checkbox = screen.getByLabelText('S');
    fireEvent.click(checkbox);

    expect(handleSizeChange).toHaveBeenCalled();
  });
});
