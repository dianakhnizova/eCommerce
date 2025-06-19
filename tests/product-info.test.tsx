import { render, screen } from '@testing-library/react';
import { ProductInfo } from '../src/pages/product-page/product-info/product-info';
import { Catalog } from '../src/sources/types/catalog';
import { CURRENCY_USD } from '../src/sources/constants/catalog.ts';
import { vi } from 'vitest';

vi.mock('../src/components/product-card/product-menu.tsx', () => ({
  ProductMenu: ({ productId }: { productId: string }) => (
    <div data-testid="product-menu">ProductMenu for {productId}</div>
  ),
}));

describe('ProductInfo', () => {
  const mockProduct: Catalog.DetailedProduct = {
    id: 'prod-123',
    name: 'Teddy Bear',
    price: '100',
    discountPrice: '80',
    color: 'Brown',
    size: 'Medium',
    description: 'Soft and fluffy teddy bear',
    images: [
      {
        url: 'https://example.com/teddy.jpg',
        dimensions: {
          w: 800,
          h: 600,
        },
      },
    ],
  };

  it('renders product details correctly', () => {
    render(<ProductInfo product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${CURRENCY_USD}${mockProduct.price}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${CURRENCY_USD}${mockProduct.discountPrice}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockProduct.color)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.size)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByTestId('product-menu')).toHaveTextContent(
      `ProductMenu for ${mockProduct.id}`
    );
  });
});
