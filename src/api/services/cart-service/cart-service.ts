import { PROJECT_KEY } from '../../../sources/constants/api';
import { Endpoints } from '../../endpoints';
import { baseApi } from '../../axios';
import { CartUpdateActions } from './enums/update-actions.ts';
import type { Cart } from '../../../sources/types/cart';

export const cartService = {
  getCart: async (cartId: string): Promise<Cart.GeneralInfo> => {
    const params = new URLSearchParams({
      view_orders: PROJECT_KEY,
    });
    const response = await baseApi.get<Cart.GeneralInfo>(
      `${PROJECT_KEY}${Endpoints.CARTS}/${cartId}`,
      { params }
    );
    return response.data;
  },

  createCart: async (): Promise<Cart.GeneralInfo> => {
    const defaultCurrency = 'USD';

    const params = new URLSearchParams({
      manage_orders: PROJECT_KEY,
    });
    const response = await baseApi.post<Cart.GeneralInfo>(
      `${PROJECT_KEY}${Endpoints.CARTS}`,
      { currency: defaultCurrency },
      { params }
    );
    return response.data;
  },

  getCustomerCarts: async (
    customerId: string
  ): Promise<{ results: Cart.GeneralInfo[] }> => {
    const params = new URLSearchParams({
      manage_orders: PROJECT_KEY,
      customer_id: customerId,
      limit: '1',
      sort: 'lastModifiedAt desc',
    });

    const response = await baseApi.get<{ results: Cart.GeneralInfo[] }>(
      `${PROJECT_KEY}${Endpoints.CARTS}`,
      { params }
    );

    return response.data;
  },

  addItemToCart: async (
    product: {
      productId: string;
      quantity?: number;
    },
    cart: Cart.GeneralInfo
  ): Promise<Cart.GeneralInfo> => {
    const body = {
      version: cart.version,
      actions: [
        {
          action: CartUpdateActions.addItem,
          productId: product.productId,
          quantity: product.quantity ?? 1,
        },
      ],
    };

    const params = new URLSearchParams({
      manage_orders: PROJECT_KEY,
    });
    const response = await baseApi.post<Cart.GeneralInfo>(
      `${PROJECT_KEY}${Endpoints.CARTS}/${cart.id}`,
      body,
      { params }
    );
    return response.data;
  },

  removeItemFromCart: async (
    lineItemId: string,
    cart: Cart.GeneralInfo
  ): Promise<Cart.GeneralInfo> => {
    const body = {
      version: cart.version,
      actions: [
        {
          action: CartUpdateActions.removeItem,
          lineItemId,
        },
      ],
    };

    const params = new URLSearchParams({
      manage_orders: PROJECT_KEY,
    });

    const response = await baseApi.post<Cart.GeneralInfo>(
      `${PROJECT_KEY}${Endpoints.CARTS}/${cart.id}`,
      body,
      { params }
    );

    return response.data;
  },

  updateItemQuantity: async (
    lineItemId: string,
    quantity: number,
    cart: Cart.GeneralInfo
  ): Promise<Cart.GeneralInfo> => {
    const body = {
      version: cart.version,
      actions: [
        {
          action: CartUpdateActions.changeQuantity,
          lineItemId,
          quantity,
        },
      ],
    };
    const params = new URLSearchParams({
      manage_orders: PROJECT_KEY,
    });

    const response = await baseApi.post<Cart.GeneralInfo>(
      `${PROJECT_KEY}${Endpoints.CARTS}/${cart.id}`,
      body,
      { params }
    );

    return response.data;
  },

  clearCart: async (cart: Cart.GeneralInfo): Promise<Cart.GeneralInfo> => {
    if (cart.lineItems.length === 0) return cart;

    const actions = cart.lineItems.map(item => ({
      action: CartUpdateActions.removeItem,
      lineItemId: item.id,
    }));

    const body = {
      version: cart.version,
      actions,
    };

    const params = new URLSearchParams({
      manage_orders: PROJECT_KEY,
    });

    const response = await baseApi.post<Cart.GeneralInfo>(
      `${PROJECT_KEY}${Endpoints.CARTS}/${cart.id}`,
      body,
      { params }
    );

    return response.data;
  },
};
