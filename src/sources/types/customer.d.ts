export namespace Customer {
  type Profile = {
    id?: string;
    addresses?: Address[];
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    defaultShippingAddress?: number;
    defaultBillingAddress?: number;
  };

  type Address = {
    country: string;
    city: string;
    streetName: string;
    postalCode: string;
  };

  type Cart = {
    id: string;
    lineItems: [];
    customLineItems: [];
    totalPrice: {
      centAmount: number;
      currencyCode: string;
      type: string;
      fractionDigits: number;
    };
  };
}
