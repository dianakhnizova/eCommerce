import { PROJECT_KEY } from '../../../sources/constants/api';

import type { Customer } from '../../../sources/types/customer';
import { baseApi } from '../../axios';
import { Endpoints } from '../../endpoints';
import {
  AddressUpdateActions,
  CustomerUpdateActions,
} from './enums/update-actions';
import type { AddressUpdateBody } from './types/address-update-body';
import type { GeneralInfoUpdateBody } from './types/general-info-update-body';

export const customerService = {
  signupNewCustomer: async (
    customer: Customer.Profile
  ): Promise<{ customer: Required<Customer.Profile> }> => {
    const response = await baseApi.post<{
      customer: Required<Customer.Profile>;
    }>(`${PROJECT_KEY}${Endpoints.SIGN_UP_CUSTOMER}`, customer);
    return response.data;
  },

  loginCustomer: async (
    customer: Customer.Profile
  ): Promise<{ customer: Required<Customer.Profile> }> => {
    const response = await baseApi.post<{
      customer: Required<Customer.Profile>;
    }>(`${PROJECT_KEY}${Endpoints.LOGIN}`, customer);
    return response.data;
  },

  getCustomerByID: async (
    customerID: string
  ): Promise<Required<Customer.Profile>> => {
    const params = new URLSearchParams({
      manage_my_profile: PROJECT_KEY,
      customer_id: customerID,
    });
    const response = await baseApi.get<Required<Customer.Profile>>(
      `${PROJECT_KEY}${Endpoints.ME}`,
      {
        params,
      }
    );
    return response.data;
  },

  getActiveCart: async (): Promise<Customer.Cart> => {
    const response = await baseApi.get<Customer.Cart>(
      `${PROJECT_KEY}${Endpoints.CART_ACTIVE}`
    );
    return response.data;
  },

  updateCustomerGeneralInfo: async (
    customer: Customer.Profile
  ): Promise<Customer.Profile> => {
    const parameters = new URLSearchParams({
      manage_my_profile: PROJECT_KEY,
      customer_id: customer.id || '1',
    });

    const newCustomer: GeneralInfoUpdateBody = {
      version: customer.version || 1,
      actions: [],
    };

    if (customer.email) {
      newCustomer.actions.push({
        action: CustomerUpdateActions.email,
        email: customer.email,
      });
    }
    if (customer.firstName) {
      newCustomer.actions.push({
        action: CustomerUpdateActions.firstName,
        firstName: customer.firstName,
      });
    }
    if (customer.lastName) {
      newCustomer.actions.push({
        action: CustomerUpdateActions.lastName,
        lastName: customer.lastName,
      });
    }
    if (customer.dateOfBirth) {
      newCustomer.actions.push({
        action: CustomerUpdateActions.dateOfBirth,
        dateOfBirth: customer.dateOfBirth,
      });
    }
    const response = await baseApi.post<Customer.Profile>(
      `${PROJECT_KEY}${Endpoints.ME}`,
      newCustomer,
      { params: parameters }
    );
    return response.data;
  },

  changePassword: async (
    customer: Customer.Profile,
    currentPassword: string,
    newPassword: string
  ): Promise<Customer.Profile> => {
    const parameters = new URLSearchParams({
      manage_my_profile: PROJECT_KEY,
      customer_id: customer.id || '',
    });

    const body = {
      version: customer.version,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    const response = await baseApi.post<Customer.Profile>(
      `${PROJECT_KEY}${Endpoints.ME}${Endpoints.PASSWORD}`,
      body,
      { params: parameters }
    );
    return response.data;
  },

  updateAddress: async (
    customer: Customer.Profile,
    address: Customer.Address,
    actions: Record<AddressUpdateActions, boolean>
  ): Promise<Customer.Profile> => {
    if (!address.id) {
      throw new Error('Address ID is required for updating address');
    }

    const parameters = new URLSearchParams({
      manage_my_profile: PROJECT_KEY,
      customer_id: customer.id || '',
    });

    const body: AddressUpdateBody = {
      version: customer.version || 1,
      actions: [],
    };

    if (actions.setDefaultShippingAddress) {
      body.actions.push({
        action: AddressUpdateActions.setDefaultShippingAddress,
        addressId: address.id,
      });
    }
    if (actions.setDefaultBillingAddress) {
      body.actions.push({
        action: AddressUpdateActions.setDefaultBillingAddress,
        addressId: address.id,
      });
    }
    if (actions.unsetDefaultShippingAddress) {
      body.actions.push(
        {
          action: AddressUpdateActions.removeShippingAddressID,
          addressId: address.id,
        },
        {
          action: AddressUpdateActions.addShippingAddressId,
          addressId: address.id,
        }
      );
    }
    if (actions.unsetDefaultBillingAddress) {
      body.actions.push(
        {
          action: AddressUpdateActions.removeBillingAddressID,
          addressId: address.id,
        },
        {
          action: AddressUpdateActions.addBillingAddressId,
          addressId: address.id,
        }
      );
    }
    if (actions.addShippingAddressId) {
      body.actions.push({
        action: AddressUpdateActions.addShippingAddressId,
        addressId: address.id,
      });
    }
    if (actions.addBillingAddressId) {
      body.actions.push({
        action: AddressUpdateActions.addBillingAddressId,
        addressId: address.id,
      });
    }
    if (actions.removeShippingAddressId) {
      body.actions.push({
        action: AddressUpdateActions.removeShippingAddressID,
        addressId: address.id,
      });
    }
    if (actions.removeBillingAddressId) {
      body.actions.push({
        action: AddressUpdateActions.removeBillingAddressID,
        addressId: address.id,
      });
    }
    if (actions.changeAddress) {
      body.actions.push({
        action: AddressUpdateActions.changeAddress,
        addressId: address.id,
        address: {
          id: address.id,
          city: address.city,
          country: address.country,
          postalCode: address.postalCode,
          streetName: address.streetName,
        },
      });
    }
    if (actions.removeAddress) {
      body.actions.push({
        action: AddressUpdateActions.removeAddress,
        addressId: address.id,
      });
    }

    const response = await baseApi.post<Customer.Profile>(
      `${PROJECT_KEY}${Endpoints.ME}`,
      body,
      { params: parameters }
    );
    return response.data;
  },

  addNewAddress: async (
    customer: Customer.Profile,
    address: Customer.Address
  ): Promise<Customer.Profile> => {
    const parameters = new URLSearchParams({
      manage_my_profile: PROJECT_KEY,
      customer_id: customer.id || '',
    });
    const body = {
      version: customer.version,
      actions: [
        {
          action: AddressUpdateActions.addAddress,
          address,
        },
      ],
    };
    const response = await baseApi.post<Customer.Profile>(
      `${PROJECT_KEY}${Endpoints.ME}`,
      body,
      { params: parameters }
    );
    return response.data;
  },
};
