import type {
  RegisterFormField,
  RegisterFormValues,
} from '../types/register.ts';
import { RegisterFieldName } from '../types/register.ts';
import { getCountryOptions } from '../../components/country-select/countries.ts';
import type { RegisterOptions } from 'react-hook-form';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import { messages } from '../../pages/register-page/messages.ts';

const countryOptions = getCountryOptions();

export const FIELDS: RegisterFormField[] = [
  {
    type: 'email',
    label: messages.email,
    placeholder: messages.email,
    name: RegisterFieldName.email,
  },
  {
    type: 'password',
    label: messages.password,
    placeholder: messages.password,
    name: RegisterFieldName.password,
  },
  {
    type: 'text',
    label: messages.firstName,
    placeholder: messages.firstName,
    name: RegisterFieldName.firstName,
  },
  {
    type: 'text',
    label: messages.lastName,
    placeholder: messages.lastName,
    name: RegisterFieldName.lastName,
  },
  {
    type: 'date',
    label: messages.birth,
    placeholder: messages.birth,
    name: RegisterFieldName.birth,
  },
];

const MIN_PASSWORD_LENGTH = 8;
const MIN_AGE = 13;
const MIN_NAME_LENGTH = 1;
const MIN_CITY_LENGTH = 1;
const MIN_STREET_LENGTH = 1;
const countryRule = {
  required: 'Country is required',
  validate: (value: string) => {
    return (
      countryOptions.some(option => option.value === value) ||
      'Please select a valid country'
    );
  },
};
const cityRule = {
  required: 'City is required',
  minLength: {
    value: MIN_CITY_LENGTH,
    message: 'City must contain at least one character',
  },
  pattern: {
    value: /^[A-Za-zА-Яа-яЁё\s'-]+$/,
    message: 'City must not contain numbers or special characters',
  },
};
const streetRule = {
  required: 'Street is required',
  minLength: {
    value: MIN_STREET_LENGTH,
    message: 'Street must contain at least one character',
  },
};
const postCodeRule = {
  required: 'Post code is required',
  validate: (value: string, formValues: RegisterFormValues) => {
    const country = formValues?.country;
    if (!country || !postcodeValidatorExistsForCountry(country)) {
      return true;
    }

    const isValid = postcodeValidator(value, country);
    return isValid || 'Invalid postal code for the selected country';
  },
};

export const validationRules: Record<
  RegisterFieldName,
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
      value: MIN_NAME_LENGTH,
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
      value: MIN_NAME_LENGTH,
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
  country: countryRule,
  city: cityRule,
  street: streetRule,
  postCode: postCodeRule,
  shippingCountry: countryRule,
  shippingCity: cityRule,
  shippingStreet: streetRule,
  shippingPostCode: postCodeRule,
};
