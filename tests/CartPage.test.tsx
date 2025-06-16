import { render, screen } from '@testing-library/react';
import { CartPage } from '../src/pages/cart-page/cart-page.tsx';
import { cartStore } from '../src/store/cart-store.ts';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('CartPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отображает карточки продуктов, если корзина не пуста', () => {
    cartStore.cart = {
      lineItems: [
        {
          id: '1',
          productId: 'prod-1',
          productSlug: { en: 'product-slug' },
          name: { en: 'Test Product' },
          variant: {
            images: [{ url: 'image-url.jpg' }],
            attributes: [{ value: 'Red' }],
          },
          price: {
            value: { centAmount: 1000 },
            discounted: null,
          },
        },
      ],
      totalPrice: { centAmount: 1000 },
    } as never;

    renderWithRouter(<CartPage />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument(); // $10
  });

  it('отображает сообщение о пустой корзине', () => {
    cartStore.cart = {
      lineItems: [],
      totalPrice: { centAmount: 0 },
    } as never;

    renderWithRouter(<CartPage />);
    expect(
      screen.getByText(/It looks like your cart is empty./i)
    ).toBeInTheDocument(); // messages.emptyCart
    expect(
      screen.getByRole('button', { name: /To catalog/i })
    ).toBeInTheDocument(); // messages.buttons.toCatalog
  });
});
