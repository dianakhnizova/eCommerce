import { render, screen } from '@testing-library/react';
import { Root } from '../src/router/root';
import { userStore } from '../src/store/user-store';
import { vi, describe, it, expect, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../src/components/header/header', () => ({
  Header: () => <div data-testid="header" />,
}));
vi.mock('../src/components/main-section/main-section', () => ({
  MainSection: () => <div data-testid="main-section" />,
}));
vi.mock('../src/components/footer/footer', () => ({
  Footer: () => <div data-testid="footer" />,
}));
vi.mock('../src/components/spinner/spinner', () => ({
  Spinner: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="spinner">{isLoading ? 'Loading...' : 'Loaded'}</div>
  ),
}));

describe('Root component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders Header, MainSection, Footer and Spinner', () => {
    userStore.isInitLoading = false;

    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('main-section')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toHaveTextContent('Loaded');
  });

  it('shows spinner loading state when isInitLoading is true', () => {
    userStore.isInitLoading = true;

    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toHaveTextContent('Loading...');
  });
});
