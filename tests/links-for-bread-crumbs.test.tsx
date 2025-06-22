import { render, screen } from '@testing-library/react';
import { LinksBreadCrumbs } from '../src/components/bread-crumbs/links-bread-crumbs/links-bread-crumbs';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../src/utils/hooks/use-crumb-links-list', () => ({
  useCrumbLinksList: () => [
    { to: '/catalog', label: 'Catalog' },
    { to: '/item', label: 'Item Name' },
  ],
}));

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('LinksBreadCrumbs', () => {
  it('renders breadcrumb links correctly', () => {
    renderWithRouter(<LinksBreadCrumbs />);

    const catalogLink = screen.getByRole('link', { name: 'Catalog' });
    expect(catalogLink).toHaveAttribute('href', '/catalog');

    const lastCrumb = screen.getByText('Item Name');
    expect(lastCrumb.closest('a')).toBeNull();
  });
});
