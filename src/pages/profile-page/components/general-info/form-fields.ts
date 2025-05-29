import type { Customer } from '../../../../sources/types/customer';

export type FormFields = Pick<
  Customer.Profile,
  'email' | 'lastName' | 'firstName' | 'dateOfBirth'
>;
