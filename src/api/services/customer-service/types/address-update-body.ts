import type { Customer } from '../../../../sources/types/customer';
import type { AddressUpdateActions } from '../enums/update-actions';

export type AddressUpdateBody = {
  version: number;
  actions: {
    action: AddressUpdateActions;
    addressId: string;
    address?: Customer.Address;
  }[];
};
