import type { Customer } from '../../../../../sources/types/customer';

export type CustomerForm = Omit<
  Customer.Profile,
  'id' | 'addresses' | 'defaultShippingAddress' | 'defaultBillingAddress'
>;
