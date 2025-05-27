import { PROJECT_KEY } from '../../sources/constants/api';
import type { Customer } from '../../sources/types/customer';
import { baseApi } from '../axios';
import { Endpoints } from '../endpoints';

export const customerService = {
  signupNewCustomer: async (
    customer: Customer.Profile
  ): Promise<{ customer: Required<Customer.ProfileExtended> }> => {
    const response = await baseApi.post<{
      customer: Required<Customer.ProfileExtended>;
    }>(`${PROJECT_KEY}${Endpoints.SIGN_UP_CUSTOMER}`, customer);
    return response.data;
  },

  loginCustomer: async (
    customer: Customer.Profile
  ): Promise<{ customer: Required<Customer.ProfileExtended> }> => {
    const response = await baseApi.post<{
      customer: Required<Customer.ProfileExtended>;
    }>(`${PROJECT_KEY}${Endpoints.LOGIN}`, customer);
    return response.data;
  },

  getCustomerByID: async (
    customerID: string
  ): Promise<Required<Customer.ProfileExtended>> => {
    const params = new URLSearchParams({
      manage_my_profile: PROJECT_KEY,
      customer_id: customerID,
    });
    const response = await baseApi.get<Required<Customer.ProfileExtended>>(
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
};
