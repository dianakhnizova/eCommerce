import { render, screen } from '@testing-library/react';
import { BreadCrumbs } from '../src/components/bread-crumbs/bread-crumbs';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../src/utils/hooks/use-page-info', () => ({
  usePageInfo: () => ({
    title: 'Test Page Title',
  }),
}));

vi.mock(
  '../src/components/bread-crumbs/links-bread-crumbs/links-bread-crumbs',
  () => ({
    LinksBreadCrumbs: () => <div data-testid="mock-breadcrumbs" />,
  })
);

vi.mock('../wrapper/wrapper', () => ({
  Wrapper: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => <div className={className}>{children}</div>,
}));

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('BreadCrumbs', () => {
  it('renders the page title and breadcrumbs', () => {
    renderWithRouter(<BreadCrumbs />);

    expect(
      screen.getByRole('heading', { name: 'Test Page Title' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('mock-breadcrumbs')).toBeInTheDocument();
  });
});
