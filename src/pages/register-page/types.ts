export type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birth: string;
  country: string;
  city: string;
  street: string;
  postCode: string;
};

export type InputFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'date'
  | 'country-select';

export type FormField<Name extends keyof FormValues = keyof FormValues> = {
  type: InputFieldType;
  label: string;
  name: Name;
  placeholder?: string;
};
