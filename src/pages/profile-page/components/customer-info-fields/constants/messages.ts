import type { CustomerForm } from '../types/customer-form';

export const messages: Record<keyof CustomerForm, string> = {
  dateOfBirth: 'Birth',
  email: 'Email',
  firstName: 'First name',
  lastName: 'Last name',
  password: 'Password',
};
