import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ResetFilters } from '../src/pages/catalog-page/catalog/filtering/reset-filters/reset-filters';

vi.mock('../src/store/catalog-store', () => ({
  catalogStore: {
    resetAllFilters: vi.fn(),
  },
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual(
    'react-router-dom'
  )) as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../src/components/button/button', () => ({
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe('ResetFilters', () => {
  it('renders and triggers reset + navigation on click', async () => {
    const { catalogStore } = await import('../src/store/catalog-store');

    render(
      <MemoryRouter>
        <ResetFilters />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', {
      name: /reset filters/i,
    });

    fireEvent.click(button);

    expect(catalogStore.resetAllFilters).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/catalog');
  });
});
