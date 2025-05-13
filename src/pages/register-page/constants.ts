import type { FormField, FormValues } from './types.ts';
import { getCountryOptions } from '../../components/country-select/countries.ts';
import type { RegisterOptions } from 'react-hook-form';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';

const countryOptions = getCountryOptions();

export const FIELDS: FormField[] = [
  {
    type: 'email',
    label: 'Email',
    placeholder: 'Email',
    name: 'email',
  },
  {
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    name: 'password',
  },
  {
    type: 'text',
    label: 'First Name',
    placeholder: 'First Name',
    name: 'firstName',
  },
  {
    type: 'text',
    label: 'Last Name',
    placeholder: 'Last Name',
    name: 'lastName',
  },
  {
    type: 'date',
    label: 'Birth',
    placeholder: 'Birth',
    name: 'birth',
  },
  {
    type: 'country-select',
    label: 'Country',
    name: 'country',
  },
  {
    type: 'text',
    label: 'City',
    placeholder: 'City',
    name: 'city',
  },
  {
    type: 'text',
    label: 'Street',
    placeholder: 'Street',
    name: 'street',
  },
  {
    type: 'text',
    label: 'Post code',
    placeholder: 'Post code',
    name: 'postCode',
  },
];

export const validationRules: Record<
  keyof FormValues,
  RegisterOptions<FormValues>
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
      value: 8,
      message: 'Password must be at least 8 characters',
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
        today.getFullYear() - 13,
        today.getMonth(),
        today.getDate()
      );
      return birthDate <= minBirthDate || 'You must be at least 13 years old';
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
    validate: (value: string, formValues: FormValues) => {
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
