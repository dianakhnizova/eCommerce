import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../src/components/header/header';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../src/components/header/top-header/top-header', () => ({
  TopHeader: () => <div data-testid="top-header">TopHeader</div>,
}));

vi.mock('../src/components/header/bottom-header/bottom-header', () => ({
  BottomHeader: () => <div data-testid="bottom-header">BottomHeader</div>,
}));

describe('Header', () => {
  it('renders TopHeader and BottomHeader components', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId('top-header')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-header')).toBeInTheDocument();
  });
});
