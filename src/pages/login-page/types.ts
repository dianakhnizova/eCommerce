export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormField = {
  type: LoginInputFieldType;
  label: string;
  name: LoginFieldName;
  placeholder?: string;
};

export enum LoginFieldName {
  email = 'email',
  password = 'password',
}

export type LoginInputFieldType = 'email' | 'password';
