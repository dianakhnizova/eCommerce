import { PROJECT_KEY } from '../../sources/constants/api';

import { Endpoints } from '../endpoints';
import type { Customer } from '../../sources/types/customer';
import { baseApi } from '../axios';

export const cartService = {
  getCart: async (cartId: string): Promise<Customer.Cart> => {
    const params = new URLSearchParams({
      view_orders: PROJECT_KEY,
    });
    const response = await baseApi.get<Customer.Cart>(
      `${PROJECT_KEY}${Endpoints.CARTS}/${cartId}`,
      { params }
    );
    return response.data;
  },

  createCart: async (): Promise<Customer.Cart> => {
    const draftCart = { currency: 'USD' };

    const params = new URLSearchParams({
      manage_orders: PROJECT_KEY,
    });
    const response = await baseApi.post<Customer.Cart>(
      `${PROJECT_KEY}${Endpoints.CARTS}`,
      draftCart,
      { params }
    );
    return response.data;
  },

  addItemToCart: async (
    product: {
      productId: string;
      quantity: number;
    },
    cart: Customer.Cart
  ): Promise<Customer.Cart> => {
    const body = {
      version: cart.version,
      actions: [
        {
          action: 'addLineItem',
          productId: product.productId,
          quantity: product.quantity,
        },
      ],
    };

    const params = new URLSearchParams({
      manage_orders: PROJECT_KEY,
    });
    const response = await baseApi.post<Customer.Cart>(
      `${PROJECT_KEY}${Endpoints.CARTS}/${cart.id}`,
      body,
      { params }
    );
    return response.data;
  },
};
