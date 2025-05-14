import type { FormField, RegisterFormValues } from './types.ts';
import { FieldName } from './types.ts';
import { getCountryOptions } from '../../components/country-select/countries.ts';
import type { RegisterOptions } from 'react-hook-form';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import { messages } from './messages.ts';

const countryOptions = getCountryOptions();

export const FIELDS: FormField[] = [
  {
    type: 'email',
    label: messages.email,
    placeholder: messages.email,
    name: FieldName.email,
  },
  {
    type: 'password',
    label: messages.password,
    placeholder: messages.password,
    name: FieldName.password,
  },
  {
    type: 'text',
    label: messages.firstName,
    placeholder: messages.firstName,
    name: FieldName.firstName,
  },
  {
    type: 'text',
    label: messages.lastName,
    placeholder: messages.lastName,
    name: FieldName.lastName,
  },
  {
    type: 'date',
    label: messages.birth,
    placeholder: messages.birth,
    name: FieldName.birth,
  },
  {
    type: 'country-select',
    label: messages.country,
    name: FieldName.country,
  },
  {
    type: 'text',
    label: messages.city,
    placeholder: messages.city,
    name: FieldName.city,
  },
  {
    type: 'text',
    label: messages.street,
    placeholder: messages.street,
    name: FieldName.street,
  },
  {
    type: 'text',
    label: messages.postCode,
    placeholder: messages.postCode,
    name: FieldName.postCode,
  },
];

const MIN_PASSWORD_LENGTH = 8;
const MIN_AGE = 13;

export const validationRules: Record<
  FieldName,
  RegisterOptions<RegisterFormValues>
> = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: MIN_PASSWORD_LENGTH,
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must include uppercase, lowercase, and number',
    },
  },
  firstName: {
    required: 'First name is required',
    minLength: {
      value: 1,
      message: 'First name must contain at least one character',
    },
    pattern: {
      value: /^[A-Za-zА-Яа-яЁё\s'-]+$/,
      message: 'First name must not contain numbers or special characters',
    },
  },
  lastName: {
    required: 'Last name is required',
    minLength: {
      value: 1,
      message: 'Last name must contain at least one character',
    },
    pattern: {
      value: /^[A-Za-zА-Яа-яЁё\s'-]+$/,
      message: 'Last name must not contain numbers or special characters',
    },
  },
  birth: {
    required: 'Birth date is required',
    validate: (value: string) => {
      const birthDate = new Date(value);
      const today = new Date();
      const minBirthDate = new Date(
        today.getFullYear() - MIN_AGE,
        today.getMonth(),
        today.getDate()
      );
      return (
        birthDate <= minBirthDate || `You must be at least ${MIN_AGE} years old`
      );
    },
  },
  country: {
    required: 'Country is required',
    validate: (value: string) => {
      return (
        countryOptions.some(option => option.value === value) ||
        'Please select a valid country'
      );
    },
  },
  city: {
    required: 'City is required',
    minLength: {
      value: 1,
      message: 'City must contain at least one character',
    },
    pattern: {
      value: /^[A-Za-zА-Яа-яЁё\s'-]+$/,
      message: 'City must not contain numbers or special characters',
    },
  },
  street: {
    required: 'Street is required',
    minLength: {
      value: 1,
      message: 'Street must contain at least one character',
    },
  },
  postCode: {
    required: 'Post code is required',
    validate: (value: string, formValues: RegisterFormValues) => {
      console.log(formValues);
      const country = formValues?.country;
      if (!country || !postcodeValidatorExistsForCountry(country)) {
        return true;
      }

      const isValid = postcodeValidator(value, country);
      return isValid || 'Invalid postal code for the selected country';
    },
  },
};
