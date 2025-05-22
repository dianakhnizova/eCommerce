import type { RegisterFormValues } from './types';

export const createSignUpData = (
  data: RegisterFormValues,
  isSameAddress: boolean,
  isDefaultBilling: boolean,
  isDefaultShipping: boolean
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

  const defaultShippingAddress = isSameAddress
    ? isDefaultBilling
      ? 0
      : undefined
    : isDefaultShipping
      ? 1
      : undefined;

  const shippingAddresses = isSameAddress ? [0] : [1];

  return {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.birth,
    addresses,
    defaultBillingAddress: isDefaultBilling ? 0 : undefined,
    defaultShippingAddress,
    shippingAddresses,
    billingAddress: [0],
  };
};
