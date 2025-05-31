import { PROJECT_KEY } from '../../sources/constants/api';
import {
  DEFAULT_OFFSET,
  LIMIT_PRODUCTS_ON_PAGE,
} from '../../sources/constants/catalog';
import type { Catalog } from '../../sources/types/catalog';
import { baseApi } from '../axios';
import { Endpoints } from '../endpoints';
import type {
  SortField,
  SortOrder,
} from '../../pages/catalog-page/catalog-options/components/sorting-selects/enums';

export const catalogService = {
  getProducts: async (
    offset = DEFAULT_OFFSET,
    limit = LIMIT_PRODUCTS_ON_PAGE,
    withTotal: boolean = true,
    sortField?: SortField,
    sortOrder?: SortOrder,
    categoryId?: string,
    searchName?: string
  ): Promise<Catalog.ProductResponse> => {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      withTotal: withTotal.toString(),
    });

    if (sortField && sortOrder) {
      params.append('sort', `${sortField} ${sortOrder}`);
    }

    if (categoryId) {
      params.append('filter.query', `categories.id:"${categoryId}"`);
    }

    if (searchName) {
      params.append('text.en', searchName);
    }
    const response = await baseApi.get<Catalog.ProductResponse>(
      `${PROJECT_KEY}${Endpoints.PRODUCT_PROJECTIONS_SEARCH}`,
      {
        params,
      }
    );
    return response.data;
  },

  getCategories: async (): Promise<Catalog.CategoriesResponse> => {
    const response = await baseApi.get<Catalog.CategoriesResponse>(
      `${PROJECT_KEY}${Endpoints.CATEGORIES}`
    );
    return response.data;
  },
};
