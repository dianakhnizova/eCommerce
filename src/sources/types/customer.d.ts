import type { Catalog } from './catalog';

export namespace Customer {
  type Profile = {
    version?: number;
    id?: string;
    addresses?: Address[];
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    defaultShippingAddress?: number;
    defaultBillingAddress?: number;
    defaultShippingAddressId?: string;
    defaultBillingAddressId?: string;
    shippingAddressIds?: string[];
    billingAddressIds?: string[];
  };

  type Address = {
    id?: string;
    country: string;
    city: string;
    streetName: string;
    postalCode: string;
  };

  type Cart = {
    id: string;
    version: number;
    lineItems: LineItem[];
    shipping: [];
    discountCodes: [];
    customLineItems: [];
    totalPrice: {
      centAmount: number;
      currencyCode: string;
      type: string;
      fractionDigits: number;
    };
  };

  type LineItem = {
    id: string;
    productId: string;
    name: Record<string, string>;
    productType: Catalog.ProductType;
    variant: Catalog.ProductVariant;
    totalPrice: {
      centAmount: number;
      currencyCode: string;
      type: string;
      fractionDigits: number;
    };
  };
}
