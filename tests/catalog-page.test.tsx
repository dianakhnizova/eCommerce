import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CatalogPage } from '../src/pages/catalog-page/catalog-page';
import { catalogStore } from '../src/store/catalog-store';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({
      categorySlug: 'shoes',
      subcategorySlug: 'boots',
    }),
  };
});

vi.mock('../src/components/bread-crumbs/bread-crumbs', () => ({
  BreadCrumbs: () => <div data-testid="breadcrumbs" />,
}));

vi.mock('../src/components/spinner/spinner', () => ({
  Spinner: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="spinner">{isLoading ? 'Loading...' : 'Not Loading'}</div>
  ),
}));

vi.mock('../src/components/wrapper/wrapper', () => ({
  Wrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="wrapper">{children}</div>
  ),
}));

vi.mock('../src/pages/catalog-page/catalog/catalog', () => ({
  Catalog: () => <div data-testid="catalog" />,
}));

describe('CatalogPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    catalogStore.isLoading = false;
    catalogStore.categories = [
      { id: '1', typeId: 'type1', slug: { en: 'shoes' } },
    ];
    catalogStore.setCategoryFromUrl = vi.fn();
  });

  it('renders core components and calls setCategoryFromUrl', () => {
    render(<CatalogPage />);

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toHaveTextContent('Not Loading');
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('catalog')).toBeInTheDocument();

    expect(catalogStore.setCategoryFromUrl).toHaveBeenCalledWith(
      'shoes',
      'boots'
    );
  });

  it('shows loading state in spinner when isLoading is true', () => {
    catalogStore.isLoading = true;
    render(<CatalogPage />);
    expect(screen.getByTestId('spinner')).toHaveTextContent('Loading...');
  });
});
