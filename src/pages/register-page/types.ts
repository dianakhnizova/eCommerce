type InputFieldType = 'text' | 'email' | 'password' | 'date' | 'country-select';

export type FormField = {
  type: InputFieldType;
  label: string;
  name: string;
  placeholder?: string;
};
