import type { FormFields } from '../form-fields';
import { messages } from './messages';

type FieldConfig = {
  name: keyof FormFields;
  label: string;
  type: 'password' | 'email' | 'date' | 'text';
  placeholder?: string;
  required?: boolean;
};

export const GeneralInfoFormFields: FieldConfig[] = [
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
