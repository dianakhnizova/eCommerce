export type LoginFormValues = {
  email: string;
  password: string;
};

export enum FieldName {
  email = 'email',
  password = 'password',
}

export type InputFieldType = 'email' | 'password';

export type FormField = {
  type: InputFieldType;
  name: FieldName;
  placeholder?: string;
};
