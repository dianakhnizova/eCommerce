import { PROJECT_KEY } from '../../../sources/constants/api';
import type { Customer } from '../../../sources/types/customer';
import { baseApi } from '../../axios';
import { Endpoints } from '../../endpoints';
import { GeneralInfoActions } from './enums/general-info-actions';
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
    customer: Pick<
      Customer.Profile,
      'dateOfBirth' | 'email' | 'lastName' | 'firstName' | 'id' | 'version'
    >
  ): Promise<Customer.Profile> => {
    const parameters = new URLSearchParams({
      manage_my_profile: PROJECT_KEY,
      customer_id: customer.id || '',
    });

    const newCustomer: GeneralInfoUpdateBody = {
      version: customer.version ?? 0,
      actions: [],
    };

    if (customer.email) {
      newCustomer.actions.push({
        action: GeneralInfoActions.email,
        email: customer.email,
      });
    }
    if (customer.firstName) {
      newCustomer.actions.push({
        action: GeneralInfoActions.firstName,
        firstName: customer.firstName,
      });
    }
    if (customer.lastName) {
      newCustomer.actions.push({
        action: GeneralInfoActions.lastName,
        lastName: customer.lastName,
      });
    }
    if (customer.dateOfBirth) {
      newCustomer.actions.push({
        action: GeneralInfoActions.dateOfBirth,
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
};
