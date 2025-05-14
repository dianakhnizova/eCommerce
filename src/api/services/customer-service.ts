import { PROJECT_KEY } from '../../sources/constants/api';
import type { Customer } from '../../sources/types/customer';
import { baseApi } from '../axios';
import { Endpoints } from '../endpoints';

type CustomerResponse = { customer: Customer.Profile };

export const customerService = {
  signupNewCustomer: async (
    customer: Customer.Profile
  ): Promise<CustomerResponse> => {
    const response = await baseApi.post<CustomerResponse>(
      `/${Endpoints.SIGN_UP}`,
      customer
    );
    return response.data;
  },

  loginCustomer: async (
    customer: Customer.Profile
  ): Promise<CustomerResponse> => {
    const response = await baseApi.post<CustomerResponse>(
      `${PROJECT_KEY}/${Endpoints.LOGIN}`,
      customer
    );
    return response.data;
  },

  getActiveCart: async (): Promise<Customer.Cart> => {
    const response = await baseApi.get<Customer.Cart>(
      `/${PROJECT_KEY}/${Endpoints.CART_ACTIVE}`
    );
    return response.data;
  },
};
