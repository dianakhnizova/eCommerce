import type { Customer } from '../../../../sources/types/customer';

export const messages: Record<keyof Customer.Address | 'default', string> = {
  id: 'Id',
  city: 'City',
  country: 'Country',
  postalCode: 'Postal code',
  streetName: 'Street name',
  default: 'Default',
};
