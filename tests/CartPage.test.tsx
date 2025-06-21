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

  it('shows product cards when the cart is not empty', () => {
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

    cartStore.product = [
      {
        id: 'prod-1',
        name: 'Test Product',
        description: 'Some short description',
        image: 'image-url.jpg',
        categorySlug: 'test-category',
        subcategorySlug: 'test-subcategory',
        price: '10',
        discountPrice: '8',
      },
    ] as never[];

    vi.spyOn(cartStore, 'getItemQuantity').mockReturnValue(1);

    renderWithRouter(<CartPage />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Some short description')).toBeInTheDocument();

    const priceElement = screen.getByText('$10');
    const discountPriceElement = screen.getByText('$8');

    expect(priceElement).toBeInTheDocument();
    expect(discountPriceElement).toBeInTheDocument();
  });

  it('show empty cart message and catalog link', () => {
    cartStore.cart = {
      lineItems: [],
      totalPrice: { centAmount: 0 },
    } as never;

    cartStore.product = [];

    renderWithRouter(<CartPage />);

    expect(
      screen.getByText(/It looks like your cart is empty./i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /To catalog/i })
    ).toBeInTheDocument();
  });
});
