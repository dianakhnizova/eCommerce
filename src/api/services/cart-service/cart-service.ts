import { PROJECT_KEY } from '../../../sources/constants/api';
import { Endpoints } from '../../endpoints';
import { baseApi } from '../../axios';
import { CartUpdateActions } from './update-actions';
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

  addItemToCart: async (
    product: {
      productId: string;
      quantity: number;
    },
    cart: Cart.GeneralInfo
  ): Promise<Cart.GeneralInfo> => {
    const body = {
      version: cart.version,
      actions: [
        {
          action: CartUpdateActions.addItem,
          productId: product.productId,
          quantity: product.quantity,
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
};
