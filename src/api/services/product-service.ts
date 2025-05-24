import { PROJECT_KEY } from '../../sources/constants/api';
import { baseApi } from '../axios';
import { Endpoints } from '../endpoints.ts';
import type { Catalog } from '../../sources/types/catalog';

export const productService = {
  getProductByID: async (
    productId: string
  ): Promise<Catalog.DetailedProductResponse> => {
    const response = await baseApi.get<Catalog.DetailedProductResponse>(
      `${PROJECT_KEY}${Endpoints.PRODUCT_PROJECTIONS}/${productId}`
    );
    return response.data;
  },
};
