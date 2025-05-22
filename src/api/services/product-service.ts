import { PROJECT_KEY } from '../../sources/constants/api';
import type { Product } from '../../sources/types/product';
import { baseApi } from '../axios';
import { Endpoints } from '../endpoints';

export const productService = {
  addNewProducts: async (
    product: Product
  ): Promise<{ product: Required<Product> }> => {
    const response = await baseApi.post<{
      product: Required<Product>;
    }>(`${PROJECT_KEY}${Endpoints.PRODUCTS}`, product);
    return response.data;
  },

  getProducts: async (): Promise<Product[]> => {
    const response = await baseApi.get<{
      results: Product[];
    }>(`${PROJECT_KEY}${Endpoints.PRODUCTS}`);
    return response.data.results;
  },
};
