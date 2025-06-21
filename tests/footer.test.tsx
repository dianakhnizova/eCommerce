import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../src/components/footer/footer';

describe('Footer', () => {
  it('рендерит футер с текстом ©Lazer Sharks', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText(/©Lazer Sharks/i)).toBeInTheDocument();
  });
});
