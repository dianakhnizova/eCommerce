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

  type Reference = {
    typeId:
      | 'cart-discount'
      | 'product'
      | 'category'
      | 'customer'
      | 'order'
      | 'discount-code'
      | 'shipping-method'
      | 'channel'
      | 'store';
    id: string;
  };

  type PromoCodeResponse = {
    id: string;
    version: number;
    versionModifiedAt: string;
    lastMessageSequenceNumber: number;
    createdAt: string;
    lastModifiedAt: string;
    lastModifiedBy?: {
      isPlatformClient: boolean;
      user?: {
        typeId: 'user';
        id: string;
      };
    };
    createdBy?: {
      isPlatformClient: boolean;
    };
    code: string;
    name: Partial<Record<string, string>>;
    description?: Partial<Record<string, string>>;
    cartDiscounts: {
      typeId: 'cart-discount';
      id: string;
    }[];
    isActive: boolean;
    maxApplicationsPerCustomer?: number;
    references: Reference[];
    groups: string[];
  };

  type PromoCode = {
    id: string;
    code: string;
    name: Partial<Record<string, string>>;
  };
}
