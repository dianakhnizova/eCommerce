import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../src/components/checkbox/checkbox';
import { vi } from 'vitest';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept Terms" />);
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
  });

  it('accepts checked and onChange props', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Subscribe" checked={false} onChange={onChange} />);

    const checkbox = screen.getByLabelText(/subscribe/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });

  it('supports className prop', () => {
    const { container } = render(
      <Checkbox label="Extra" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
