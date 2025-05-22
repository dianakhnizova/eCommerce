import { PROJECT_KEY } from '../../sources/constants/api';
import { baseApi } from '../axios';
import type { Product } from '../../sources/types/product';

export const productService = {
  getProductByID: async (productId: string): Promise<Product.Product> => {
    const response = await baseApi.get<Product.Product>(
      `/${PROJECT_KEY}/product-projections/${productId}`
    );
    return response.data;
  },
};
