import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RightNavMenu } from '../src/components/header/bottom-header/right-menu/right-menu';

vi.mock('../src/components/product-search/product-search.tsx', () => ({
  ProductSearch: () => <div data-testid="product-search">Search</div>,
}));

describe('RightNavMenu', () => {
  it('renders ProductSearch component', () => {
    render(<RightNavMenu />);
    const searchElement = screen.getByTestId('product-search');
    expect(searchElement).toBeInTheDocument();
    expect(searchElement).toHaveTextContent('Search');
  });
});
