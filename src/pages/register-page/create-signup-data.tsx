import type { RegisterFormValues } from './types';

export const createSignUpData = (
  data: RegisterFormValues,
  isSameAddress: boolean
) => {
  const billingAddress = {
    country: data.country,
    city: data.city,
    streetName: data.street,
    postalCode: data.postCode,
  };

  const addresses = [billingAddress];
  if (!isSameAddress) {
    addresses.push({
      country: data.shippingCountry,
      city: data.shippingCity,
      streetName: data.shippingStreet,
      postalCode: data.shippingPostCode,
    });
  }

  return {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.birth,
    addresses,
    defaultBillingAddress: 0,
    defaultShippingAddress: 0,
    shippingAddresses: [0],
  };
};
