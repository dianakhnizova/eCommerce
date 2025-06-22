import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../src/components/footer/footer';
import styles from '../src/components/footer/footer.module.css';

describe('Footer', () => {
  it('renders the footer with correct styles', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass(styles.footer);
  });

  it('renders the correct copyright text', () => {
    render(<Footer />);

    const text = screen.getByText('©Lazer Sharks');
    expect(text).toBeInTheDocument();
  });
});
