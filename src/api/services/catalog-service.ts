import { PROJECT_KEY } from '../../sources/constants/api';
import {
  DEFAULT_OFFSET,
  LIMIT_PRODUCTS_ON_PAGE,
} from '../../sources/constants/catalog';
import type { Catalog } from '../../sources/types/catalog';
import { baseApi } from '../axios';
import { Endpoints } from '../endpoints';

export const catalogService = {
  getProducts: async (
    offset = DEFAULT_OFFSET,
    limit = LIMIT_PRODUCTS_ON_PAGE,
    withTotal: boolean = true
  ): Promise<Catalog.ProductResponse> => {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      withTotal: withTotal.toString(),
    });
    const response = await baseApi.get<Catalog.ProductResponse>(
      `${PROJECT_KEY}${Endpoints.PRODUCTS}`,
      {
        params,
      }
    );
    return response.data;
  },
};
