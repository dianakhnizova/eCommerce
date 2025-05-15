export type RegisterFormValues = {
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

export enum FieldName {
  email = 'email',
  password = 'password',
  firstName = 'firstName',
  lastName = 'lastName',
  birth = 'birth',
  country = 'country',
  city = 'city',
  street = 'street',
  postCode = 'postCode',
}

export type FormField = {
  type: InputFieldType;
  label: string;
  name: FieldName;
  placeholder?: string;
};
