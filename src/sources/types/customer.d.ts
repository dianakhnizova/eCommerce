export namespace Customer {
  interface Profile {
    id?: string;
    addresses?: Address[];
    email: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    dateOfBirth?: string;
  }

  interface Address {
    country: string;
    city: string;
    streetName: string;
    postalCode: string;
  }

  interface Cart {
    id: string;
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
