import type { RegisterOptions } from 'react-hook-form';

export type RegisterFormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birth: string;
  country: string;
  city: string;
  street: string;
  postCode: string;
  shippingCountry: string;
  shippingCity: string;
  shippingStreet: string;
  shippingPostCode: string;
  currentPassword?: string;
  newPassword?: string;
};

export type FormFieldConfig = {
  type: RegisterInputFieldType;
  label: string;
  name: CustomerFieldName;
  placeholder?: string;
};

export enum CustomerFieldName {
  email = 'email',
  password = 'password',
  firstName = 'firstName',
  lastName = 'lastName',
  birth = 'birth',
  country = 'country',
  city = 'city',
  street = 'street',
  postCode = 'postCode',
  shippingCountry = 'shippingCountry',
  shippingCity = 'shippingCity',
  shippingStreet = 'shippingStreet',
  shippingPostCode = 'shippingPostCode',
  currentPassword = 'currentPassword',
  newPassword = 'newPassword',
}

export type RegisterInputFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'date'
  | 'country-select'
  | 'checkbox';

export type ValidationRules = Record<string, RegisterOptions>;
