import { render, screen } from '@testing-library/react';
import { MainSection } from '../src/components/main-section/main-section';
import { vi } from 'vitest';

vi.mock('react-router', () => ({
  Outlet: () => <div data-testid="outlet-mock" />,
}));

describe('MainSection', () => {
  it('renders with correct class and includes Outlet', () => {
    render(<MainSection />);

    const mainElement = screen.getByRole('main');

    expect(screen.getByTestId('outlet-mock')).toBeInTheDocument();
  });
});
