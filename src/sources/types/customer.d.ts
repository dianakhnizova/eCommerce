export namespace Customer {
  interface Customer {
    addresses: string[];
    email: string;
    firstName?: string;
    id: string;
    isEmailVerified: false;
    lastName?: string;
    password?: string;
    version: number;
    createdAt: string;
    lastModifiedAt: string;
    authenticationMode: string;
    stores: [];
  }

  interface Cart {
    id: string;
    version: number;
    lineItems: [];
    customLineItems: [];
    totalPrice: {
      centAmount: number;
      currencyCode: string;
      type: string;
      fractionDigits: number;
    };
  }
}
