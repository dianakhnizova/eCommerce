import type { Catalog } from './catalog';

export namespace Cart {
  type GeneralInfo = {
    id: string;
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
    productSlug: Record<string, string>;
    productType: Catalog.ProductType;
    variant: Catalog.ProductVariant;
    totalPrice: Price;
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
