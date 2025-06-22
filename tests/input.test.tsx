import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../src/components/input/input';
import { describe, it, expect } from 'vitest';

describe('Input component', () => {
  it('renders with label if provided', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders error message if error prop is passed', () => {
    render(<Input label="Email" error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('toggles password visibility when button is clicked', async () => {
    render(<Input type="password" aria-label="Password" />);
    const input = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button');

    expect(input).toHaveAttribute('type', 'password');

    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('applies custom className if provided', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toMatch(/custom-class/);
  });
});
