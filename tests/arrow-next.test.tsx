import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ArrowNext } from '../src/components/product-slider/arrow-next/arrow-next';

describe('ArrowNext', () => {
  it('renders the arrow icon', () => {
    render(<ArrowNext className="custom-class" onClick={vi.fn()} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ArrowNext className="custom-class" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
