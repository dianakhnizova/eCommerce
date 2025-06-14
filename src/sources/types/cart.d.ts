import type { Catalog } from './catalog';

export namespace Cart {
  type GeneralInfo = {
    id: string;
    anonymousId?: string;
    version: number;
    lineItems: Item[];
    shipping: [];
    discountCodes: [];
    customLineItems: [];
    totalPrice: Price;
  };

  type Item = {
    id: string;
    productId: string;
    name: Record<string, string>;
    description: Record<string, string>;
    categories: ProductCategory[];
    slug: Record<string, string>;
    productType: Catalog.ProductType;
    variant: Catalog.ProductVariant;
    totalPrice: Price;
    quantity: number;
    price: {
      id: string;
      value: Price;
      discounted?: {
        value: Price;
        discount: {
          typeId: 'product-discount';
          id: string;
        };
      };
    };
    taxedPricePortions: TaxPortion[];
  };

  type Price = {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };

  type TaxPortion = {
    id: string;
    name?: string;
    rate: number;
    amount: Price;
    includedInPrice: boolean;
  };
}
