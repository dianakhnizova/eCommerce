import type { CustomerForm } from '../types/customer-form';
import { messages } from './messages';

export const CustomerFields: {
  name: keyof CustomerForm;
  label: string;
  type: 'password' | 'email' | 'date' | 'text';
  placeholder?: string;
  required?: boolean;
}[] = [
  {
    name: 'password',
    label: messages.password,
    type: 'password',
    placeholder: messages.password,
    required: false,
  },
  {
    name: 'email',
    label: messages.email,
    type: 'email',
    placeholder: messages.email,
    required: true,
  },
  {
    name: 'dateOfBirth',
    label: messages.dateOfBirth,
    type: 'date',
    required: true,
  },
  {
    name: 'firstName',
    label: messages.firstName,
    type: 'text',
    placeholder: messages.firstName,
    required: true,
  },
  {
    name: 'lastName',
    label: messages.lastName,
    type: 'text',
    placeholder: messages.lastName,
    required: true,
  },
];
