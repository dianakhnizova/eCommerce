import { PROJECT_KEY } from '../../sources/constants/api';
import type { Catalog } from '../../sources/types/catalog';
import { baseApi } from '../axios';
import { Endpoints } from '../endpoints';

export const productService = {
  getProducts: async (): Promise<Catalog.ProductResponse> => {
    const response = await baseApi.get<Catalog.ProductResponse>(
      `${PROJECT_KEY}${Endpoints.PRODUCTS}`
    );
    return response.data;
  },
};
