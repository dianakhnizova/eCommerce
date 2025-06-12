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
} from '../../pages/catalog-page/catalog/filtering/options/sorting-selects/enums';

export const catalogService = {
  getProducts: async (
    offset = DEFAULT_OFFSET,
    limit = LIMIT_PRODUCTS_ON_PAGE,
    withTotal: boolean = true,
    sortField?: SortField,
    sortOrder?: SortOrder,
    categoryId?: string,
    subcategoryId?: string,
    searchName?: string,
    selectedColors: string[] = [],
    selectedSizes: string[] = [],
    priceFrom?: number,
    priceTo?: number
  ): Promise<Catalog.ProductResponse> => {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      withTotal: withTotal.toString(),
    });

    if (sortField && sortOrder) {
      params.append('sort', `${sortField} ${sortOrder}`);
    }

    if (categoryId && subcategoryId) {
      params.append('filter.query', `categories.id:"${subcategoryId}"`);
    } else if (categoryId) {
      params.append('filter.query', `categories.id: subtree("${categoryId}")`);
    }

    if (searchName) {
      params.append('text.en', searchName);
    }

    if (selectedColors.length > 0) {
      const colorFilter = `variants.attributes.attribute-color:${selectedColors
        .map(color => `"${color}"`)
        .join(',')}`;
      params.append('filter.query', colorFilter);
    }

    if (selectedSizes.length > 0) {
      const sizeFilter = `variants.attributes.attribute-size:${selectedSizes
        .map(size => `"${size}"`)
        .join(',')}`;
      params.append('filter.query', sizeFilter);
    }

    if (priceFrom !== undefined && priceTo !== undefined) {
      const priceFilter = `variants.price.centAmount:range (${priceFrom} to ${priceTo})`;
      params.append('filter.query', priceFilter);
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
