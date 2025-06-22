import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ArrowPrev } from '../src/components/product-slider/arrow-prev/arrow-prev';

describe('ArrowPrev', () => {
  it('renders the arrow icon', () => {
    render(<ArrowPrev className="custom-prev-class" onClick={vi.fn()} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ArrowPrev className="custom-prev-class" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
