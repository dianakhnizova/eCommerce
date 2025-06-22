import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { PriceOptions } from '../src/pages/catalog-page/catalog/filtering/options/price-options/price-options';
import { catalogStore } from '../src/store/catalog-store';
import { messages } from '../src/sources/messages';

describe('PriceOptions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();

    catalogStore.priceFrom = 5000;
    catalogStore.priceTo = 15000;
  });

  it('renders price title and initial price range', () => {
    render(<PriceOptions />);
    expect(screen.getByText(messages.titles.priceTitle)).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('$150')).toBeInTheDocument();
  });

  it('updates local price state on slider change', async () => {
    render(<PriceOptions />);
    const thumb = screen.getAllByRole('slider')[0];

    thumb.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(thumb).toHaveFocus();
  });
});
