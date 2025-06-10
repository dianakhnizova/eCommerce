export enum CustomerUpdateActions {
  email = 'changeEmail',
  firstName = 'setFirstName',
  lastName = 'setLastName',
  dateOfBirth = 'setDateOfBirth',
}

export enum AddressUpdateActions {
  changeAddress = 'changeAddress',
  addAddress = 'addAddress',

  setDefaultShippingAddress = 'setDefaultShippingAddress',
  setDefaultBillingAddress = 'setDefaultBillingAddress',
  unsetDefaultShippingAddress = 'unsetDefaultShippingAddress',
  unsetDefaultBillingAddress = 'unsetDefaultBillingAddress',

  addShippingAddressId = 'addShippingAddressId',
  addBillingAddressId = 'addBillingAddressId',
  removeShippingAddressID = 'removeShippingAddressId',
  removeBillingAddressID = 'removeBillingAddressId',
  removeAddress = 'removeAddress',
}
