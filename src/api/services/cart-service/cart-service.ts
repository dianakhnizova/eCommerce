import {
  DEFAULT_ITEM_QUANTITY,
  PROJECT_KEY,
} from '../../../sources/constants/api';
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

  getCustomerCart: async (
    customerId: string
  ): Promise<Cart.GeneralInfo | null> => {
    const params = new URLSearchParams({
      manage_orders: PROJECT_KEY,
      customer_id: customerId,
      limit: '10',
      sort: 'lastModifiedAt desc',
    });

    const response = await baseApi.get<{ results: Cart.GeneralInfo[] }>(
      `${PROJECT_KEY}${Endpoints.CARTS}`,
      { params }
    );

    const carts = response.data.results;
    return carts[0] || null;
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
          quantity: product.quantity ?? DEFAULT_ITEM_QUANTITY,
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

  addPromoCode: async (
    code: string,
    cart: Cart.GeneralInfo
  ): Promise<Cart.GeneralInfo> => {
    const body = {
      version: cart.version,
      actions: [
        {
          action: CartUpdateActions.addDiscountCode,
          code,
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

  getActivePromoCodes: async (): Promise<Cart.PromoCodeResponse[]> => {
    const params = new URLSearchParams({
      view_discount_codes: PROJECT_KEY,
      where: 'isActive=true',
      limit: '10',
    });

    const response = await baseApi.get<{ results: Cart.PromoCodeResponse[] }>(
      `${PROJECT_KEY}${Endpoints.DISCOUNT_CODES}`,
      {
        params,
      }
    );
    return response.data.results;
  },

  removePromoCode: async (
    discountCodeId: string,
    cart: Cart.GeneralInfo
  ): Promise<Cart.GeneralInfo> => {
    const body = {
      version: cart.version,
      actions: [
        {
          action: CartUpdateActions.removeDiscountCode,
          discountCode: {
            typeId: 'discount-code',
            id: discountCodeId,
          },
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

  deleteCart: async (cart: Cart.GeneralInfo) => {
    const params = new URLSearchParams({
      version: cart.version.toString(),
    });

    const response = await baseApi.delete<Cart.GeneralInfo>(
      `${PROJECT_KEY}${Endpoints.CARTS}/${cart.id}`,
      { params }
    );

    return response.data;
  },
};
