import type { RegisterOptions } from 'react-hook-form';
import type { FormFields } from '../form-fields';

const MIN_AGE = 13;
const MIN_NAME_LENGTH = 1;

export const rules: Record<keyof FormFields, RegisterOptions<FormFields>> = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Invalid email address',
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
