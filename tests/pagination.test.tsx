import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../src/components/pagination/pagination';
import { catalogStore } from '../src/store/catalog-store';
import { vi } from 'vitest';

vi.mock('../src/store/catalog-store', () => {
  return {
    catalogStore: {
      pagination: {
        offset: 0,
        limit: 10,
        total: 50,
      },
      setPagination: vi.fn(),
    },
  };
});

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders current page and total pages', () => {
    render(<Pagination />);

    expect(screen.getByText(/Page/i)).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination />);

    const prevButton = screen.getAllByRole('button')[0];
    expect(prevButton).toBeDisabled();
  });

  it('enables next button when not on last page', () => {
    render(<Pagination />);

    const nextButton = screen.getAllByRole('button')[1];
    expect(nextButton).not.toBeDisabled();
  });

  it('calls setPagination with correct offset when clicking next', () => {
    render(<Pagination />);

    const nextButton = screen.getAllByRole('button')[1];
    fireEvent.click(nextButton);

    expect(catalogStore.setPagination).toHaveBeenCalledWith(10);
  });

  it('calls setPagination with correct offset when clicking previous', () => {
    catalogStore.pagination.offset = 10;
    catalogStore.pagination.limit = 10;
    catalogStore.pagination.total = 50;

    render(<Pagination />);

    const prevButton = screen.getAllByRole('button')[0];
    fireEvent.click(prevButton);

    expect(catalogStore.setPagination).toHaveBeenCalledWith(0);
  });

  it('disables next button on last page', () => {
    catalogStore.pagination.offset = 40;
    catalogStore.pagination.limit = 10;
    catalogStore.pagination.total = 50;

    render(<Pagination />);

    const nextButton = screen.getAllByRole('button')[1];
    expect(nextButton).toBeDisabled();
  });
});
