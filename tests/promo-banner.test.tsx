import { render, screen, fireEvent } from '@testing-library/react';
import { PromoBanner } from '../src/pages/main-page/promo-banner/promo-banner';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { messages } from '../src/sources/messages';

const mockNavigate = vi.fn();

vi.mock('../src/components/promocode/promo-code.tsx', () => ({
  PromoCode: () => <div data-testid="promo-code">PromoCode</div>,
}));

vi.mock('../src/store/cart-store.ts', () => ({
  cartStore: {
    get promoCodes() {
      return [{ id: 'promo1' }];
    },
    getActivePromoCodes: vi.fn(),
  },
}));

vi.mock('../src/store/user-store.ts', () => ({
  userStore: {
    isAuth: true,
  },
}));

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('PromoBanner', () => {
  it('renders banner content and promo code', () => {
    render(
      <MemoryRouter>
        <PromoBanner />
      </MemoryRouter>
    );

    expect(
      screen.getByText(messages.titles.mainBannerTitle)
    ).toBeInTheDocument();
    expect(screen.getByText(messages.mainBannerText)).toBeInTheDocument();
    expect(screen.getByText(messages.buttons.shopNow)).toBeInTheDocument();
    expect(screen.getByTestId('promo-code')).toBeInTheDocument();
  });

  it('navigates to catalog page on button click', () => {
    render(
      <MemoryRouter>
        <PromoBanner />
      </MemoryRouter>
    );

    const button = screen.getByText(messages.buttons.shopNow);
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/catalog');
  });
});
