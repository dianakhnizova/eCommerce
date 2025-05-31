import type { FormFieldConfig, RegisterFormValues } from '../types/register.ts';
import { CustomerFieldName } from '../types/register.ts';
import type { RegisterOptions } from 'react-hook-form';

import {
  birthRule,
  cityRule,
  countryRule,
  firstNameRule,
  lastNameRule,
  passwordRule,
  postCodeRule,
  streetRule,
} from './validation-rules.ts';
import { messages } from '../messages.ts';

export const FIELDS: FormFieldConfig[] = [
  {
    type: 'email',
    label: messages.email,
    placeholder: messages.email,
    name: CustomerFieldName.email,
  },
  {
    type: 'password',
    label: messages.password,
    placeholder: messages.password,
    name: CustomerFieldName.password,
  },
  {
    type: 'text',
    label: messages.firstName,
    placeholder: messages.firstName,
    name: CustomerFieldName.firstName,
  },
  {
    type: 'text',
    label: messages.lastName,
    placeholder: messages.lastName,
    name: CustomerFieldName.lastName,
  },
  {
    type: 'date',
    label: messages.birth,
    placeholder: messages.birth,
    name: CustomerFieldName.birth,
  },
  {
    type: 'password',
    label: messages.currentPassword,
    placeholder: messages.currentPassword,
    name: CustomerFieldName.currentPassword,
  },
  {
    type: 'password',
    label: messages.newPassword,
    placeholder: messages.newPassword,
    name: CustomerFieldName.newPassword,
  },
];

export const validationRules: Record<
  CustomerFieldName,
  RegisterOptions<RegisterFormValues>
> = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Invalid email address',
    },
  },
  password: passwordRule,
  firstName: firstNameRule,
  lastName: lastNameRule,
  birth: birthRule,
  country: countryRule,
  city: cityRule,
  street: streetRule,
  postCode: postCodeRule,
  shippingCountry: countryRule,
  shippingCity: cityRule,
  shippingStreet: streetRule,
  shippingPostCode: postCodeRule,
  currentPassword: passwordRule,
  newPassword: passwordRule,
};
