import { messages } from './messages.ts';

export const FIELDS = [
  {
    type: 'email',
    label: messages.fields.email.label,
    placeholder: messages.fields.email.placeholder,
    name: messages.fields.email.name,
  },
  {
    type: 'password',
    label: messages.fields.password.label,
    placeholder: messages.fields.password.placeholder,
    name: messages.fields.password.name,
  },
  {
    type: 'text',
    label: messages.fields.firstName.label,
    placeholder: messages.fields.firstName.placeholder,
    name: messages.fields.firstName.name,
  },
  {
    type: 'text',
    label: messages.fields.lastName.label,
    placeholder: messages.fields.lastName.placeholder,
    name: messages.fields.lastName.name,
  },
  {
    type: 'date',
    label: messages.fields.birth.label,
    placeholder: messages.fields.birth.placeholder,
    name: messages.fields.birth.name,
  },
  {
    type: 'country-select',
    label: messages.fields.country.label,
    name: messages.fields.country.name,
  },
  {
    type: 'text',
    label: messages.fields.city.label,
    placeholder: messages.fields.city.placeholder,
    name: messages.fields.city.name,
  },
  {
    type: 'text',
    label: messages.fields.street.label,
    placeholder: messages.fields.street.placeholder,
    name: messages.fields.street.name,
  },
  {
    type: 'text',
    label: messages.fields.postCode.label,
    placeholder: messages.fields.postCode.placeholder,
    name: messages.fields.postCode.name,
  },
];
