import type { CustomerForm } from '../types/customer-form.ts';
import type { RegisterOptions } from 'react-hook-form';

const MIN_PASSWORD_LENGTH = 8;
const MIN_AGE = 13;
const MIN_NAME_LENGTH = 1;

export const rules: Record<
  keyof CustomerForm,
  RegisterOptions<CustomerForm>
> = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Invalid email address',
    },
  },
  password: {
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
  dateOfBirth: {
    required: 'Birth date is required',
    validate: value => {
      if (!value) {
        return 'Birth date is required';
      }
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
};
