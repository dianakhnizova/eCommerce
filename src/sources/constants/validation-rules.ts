import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import type { RegisterFormValues } from '../types/register';
import type { RegisterOptions } from 'react-hook-form';
import { getCountryOptions } from '../../pages/register-page/country-select/countries';

const countryOptions = getCountryOptions();

export const MIN_PASSWORD_LENGTH = 8;
export const MIN_AGE = 13;
export const MIN_NAME_LENGTH = 1;
export const MIN_CITY_LENGTH = 1;
export const MIN_STREET_LENGTH = 1;

export const countryRule: RegisterOptions<RegisterFormValues> = {
  required: 'Country is required',
  validate: (value?: string) => {
    if (!value) return 'Country is required';
    return (
      countryOptions.some(option => option.value === value) ||
      'Please select a valid country'
    );
  },
};
export const birthRule: RegisterOptions<RegisterFormValues> = {
  required: 'Birth date is required',
  validate: (value?: string) => {
    if (!value) return 'Birth date is required';
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
};

export const firstNameRule: RegisterOptions<RegisterFormValues> = {
  required: 'First name is required',
  minLength: {
    value: MIN_NAME_LENGTH,
    message: 'First name must contain at least one character',
  },
  pattern: {
    value: /^[A-Za-zА-Яа-яЁё\s'-]+$/,
    message: 'First name must not contain numbers or special characters',
  },
};
export const lastNameRule: RegisterOptions<RegisterFormValues> = {
  required: 'Last name is required',
  minLength: {
    value: MIN_NAME_LENGTH,
    message: 'Last name must contain at least one character',
  },
  pattern: {
    value: /^[A-Za-zА-Яа-яЁё\s'-]+$/,
    message: 'Last name must not contain numbers or special characters',
  },
};

export const passwordRule: RegisterOptions<RegisterFormValues> = {
  required: 'Password is required',
  minLength: {
    value: MIN_PASSWORD_LENGTH,
    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: 'Password must include uppercase, lowercase, and number',
  },
};

export const cityRule: RegisterOptions<RegisterFormValues> = {
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

export const streetRule: RegisterOptions<RegisterFormValues> = {
  required: 'Street is required',
  minLength: {
    value: MIN_STREET_LENGTH,
    message: 'Street must contain at least one character',
  },
};

export const postCodeRule: RegisterOptions<RegisterFormValues> = {
  required: 'Post code is required',
  validate: (value?: string, formValues?: RegisterFormValues) => {
    if (!value) return 'Post code is required';
    const country = formValues?.country;
    if (!country || !postcodeValidatorExistsForCountry(country)) {
      return true;
    }

    const isValid = postcodeValidator(value, country);
    return isValid || 'Invalid postal code for the selected country';
  },
};
