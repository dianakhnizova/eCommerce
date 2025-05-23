import type { LoginFormField, LoginFormValues } from './types.ts';
import { LoginFieldName } from './types.ts';
import { messages } from './messages.ts';
import type { RegisterOptions } from 'react-hook-form';

export const FIELDS: LoginFormField[] = [
  {
    type: 'email',
    placeholder: messages.email,
    label: 'Email',
    name: LoginFieldName.email,
  },
  {
    type: 'password',
    label: 'Password',
    placeholder: messages.password,
    name: LoginFieldName.password,
  },
];

const MIN_PASSWORD_LENGTH = 8;

export const validationRules: Record<
  LoginFieldName,
  RegisterOptions<LoginFormValues>
> = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Invalid email address',
    },
    validate: value =>
      value.trim() === value ||
      'Email must not contain leading or trailing whitespace',
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
    validate: value =>
      value.trim() === value ||
      'Password must not contain leading or trailing whitespace',
  },
};
