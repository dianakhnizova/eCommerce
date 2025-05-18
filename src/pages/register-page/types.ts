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
  shippingCountry: string;
  shippingCity: string;
  shippingStreet: string;
  shippingPostCode: string;
  // defaultShippingAddress: string;
  // defaultBillingAddress: string;
};

export type RegisterFormField = {
  type: InputFieldType;
  label: string;
  name: RegisterFieldName;
  placeholder?: string;
};

export enum RegisterFieldName {
  email = 'email',
  password = 'password',
  firstName = 'firstName',
  lastName = 'lastName',
  birth = 'birth',
  country = 'country',
  city = 'city',
  street = 'street',
  postCode = 'postCode',
  shippingCountry = 'shippingCountry',
  shippingCity = 'shippingCity',
  shippingStreet = 'shippingStreet',
  shippingPostCode = 'shippingPostCode',
}

export type InputFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'date'
  | 'country-select'
  | 'checkbox';
