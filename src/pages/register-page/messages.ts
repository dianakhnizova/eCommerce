import type { FormField } from './types.ts';

export const messages: {
  alreadyHaveAnAccountText: string;
  altLogoText: string;
  buttons: {
    signIn: string;
    signUp: string;
  };
  formFields: FormField[];
} = {
  alreadyHaveAnAccountText: 'Already have an account? ',
  altLogoText: 'logo',
  buttons: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
  },
  formFields: [
    { type: 'email', label: 'Email', placeholder: 'Email', name: 'email' },
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
    { type: 'date', label: 'Birth', placeholder: 'Birth', name: 'birth' },
    { type: 'country-select', label: 'Country', name: 'country' },
    { type: 'text', label: 'City', placeholder: 'City', name: 'city' },
    { type: 'text', label: 'Street', placeholder: 'Street', name: 'street' },
    {
      type: 'text',
      label: 'Post code',
      placeholder: 'Post code',
      name: 'postCode',
    },
  ],
};
