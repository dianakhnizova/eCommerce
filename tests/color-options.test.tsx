import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ColorOptions } from '../src/pages/catalog-page/catalog/filtering/options/color-options/color-options';
import { catalogStore } from '../src/store/catalog-store';
import * as handleColorChangeModule from '../src/pages/catalog-page/catalog/filtering/options/color-options/handle-color-change';
import { messages } from '../src/sources/messages';

vi.mock('../src/store/catalog-store', () => ({
  catalogStore: {
    colorsList: [],
    selectedColors: [],
  },
}));

describe('ColorOptions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the correct title and list of colors', () => {
    catalogStore.colorsList = ['Red', 'Green', 'Blue'];
    catalogStore.selectedColors = ['Green'];

    render(<ColorOptions />);

    expect(screen.getByText(messages.titles.colorTitle)).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);

    expect(screen.getByLabelText('Red')).toBeInTheDocument();
    expect(screen.getByLabelText('Green')).toBeInTheDocument();
    expect(screen.getByLabelText('Blue')).toBeInTheDocument();

    expect(screen.getByLabelText('Green')).toBeChecked();
    expect(screen.getByLabelText('Red')).not.toBeChecked();
  });

  it('calls handleColorChange when a checkbox is clicked', () => {
    catalogStore.colorsList = ['Red'];
    catalogStore.selectedColors = [];

    const handleColorChangeMock = vi
      .spyOn(handleColorChangeModule, 'handleColorChange')
      .mockImplementation(() => {});

    render(<ColorOptions />);

    const checkbox = screen.getByLabelText('Red');
    fireEvent.click(checkbox);

    expect(handleColorChangeMock).toHaveBeenCalled();
  });
});
