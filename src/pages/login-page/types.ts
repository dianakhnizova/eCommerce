export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormField = {
  type: InputFieldType;
  label: string;
  name: LoginFieldName;
  placeholder?: string;
};

export enum LoginFieldName {
  email = 'email',
  password = 'password',
}

export type InputFieldType = 'email' | 'password';
