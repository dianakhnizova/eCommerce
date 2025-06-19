import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../src/components/button/button';
import { ButtonVariants } from '../src/components/button/enums';
import { vi } from 'vitest';

describe('Button component', () => {
  it('renders with primary variant by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toMatch(/primary/);
  });

  it('renders with secondary variant when passed', () => {
    render(<Button variant={ButtonVariants.secondary}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button.className).toMatch(/secondary/);
  });

  it('applies custom className if provided', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button.className).toMatch(/custom-class/);
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
