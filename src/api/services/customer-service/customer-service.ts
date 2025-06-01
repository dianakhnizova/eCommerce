import { PROJECT_KEY } from '../../../sources/constants/api';

import type { Customer } from '../../../sources/types/customer';
import { baseApi } from '../../axios';
import { Endpoints } from '../../endpoints';
import { UpdateActions } from './enums/update-actions';
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
        action: UpdateActions.email,
        email: customer.email,
      });
    }
    if (customer.firstName) {
      newCustomer.actions.push({
        action: UpdateActions.firstName,
        firstName: customer.firstName,
      });
    }
    if (customer.lastName) {
      newCustomer.actions.push({
        action: UpdateActions.lastName,
        lastName: customer.lastName,
      });
    }
    if (customer.dateOfBirth) {
      newCustomer.actions.push({
        action: UpdateActions.dateOfBirth,
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
          action: UpdateActions.changeAddress,
          addressId: address.id,
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
          action: UpdateActions.addAddress,
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

  setDefaultShippingAddress: async (
    customer: Customer.Profile,
    addressId: string
  ): Promise<Customer.Profile> => {
    const parameters = new URLSearchParams({
      manage_my_profile: PROJECT_KEY,
      customer_id: customer.id || '',
    });

    const body = {
      version: customer.version,
      actions: [
        {
          action: UpdateActions.setDefaultShippingAddress,
          addressId,
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

  setDefaultBillingAddress: async (
    customer: Customer.Profile,
    addressId: string
  ): Promise<Customer.Profile> => {
    const parameters = new URLSearchParams({
      manage_my_profile: PROJECT_KEY,
      customer_id: customer.id || '',
    });

    const body = {
      version: customer.version,
      actions: [
        {
          action: UpdateActions.setDefaultBillingAddress,
          addressId,
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

  addShippingAddressId: async (
    customer: Customer.Profile,
    addressId: string
  ): Promise<Customer.Profile> => {
    const parameters = new URLSearchParams({
      manage_my_profile: PROJECT_KEY,
      customer_id: customer.id || '',
    });
    const body = {
      version: customer.version,
      actions: [
        {
          action: UpdateActions.addShippingAddressId,
          addressId,
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

  addBillingAddressId: async (
    customer: Customer.Profile,
    addressId: string
  ): Promise<Customer.Profile> => {
    const parameters = new URLSearchParams({
      manage_my_profile: PROJECT_KEY,
      customer_id: customer.id || '',
    });
    const body = {
      version: customer.version,
      actions: [
        {
          action: UpdateActions.addBillingAddressId,
          addressId,
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
