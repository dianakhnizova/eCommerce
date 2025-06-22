import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Catalog } from '../src/pages/catalog-page/catalog/catalog';

vi.mock('../src/pages/catalog-page/catalog/filtering/sidebar', () => ({
  SideBar: () => <div data-testid="sidebar-mock">Mocked SideBar</div>,
}));

vi.mock('../src/pages/catalog-page/catalog/product-list/product-list', () => ({
  ProductList: () => (
    <div data-testid="productlist-mock">Mocked ProductList</div>
  ),
}));

describe('Catalog', () => {
  it('renders SideBar and ProductList components', () => {
    render(<Catalog />);

    expect(screen.getByTestId('sidebar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('productlist-mock')).toBeInTheDocument();
  });
});
