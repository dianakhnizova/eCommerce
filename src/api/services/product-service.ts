import { api } from '../axios';
import { baseUrl } from '../constants';
import { Endpoints } from '../endpoints';

export interface ProductResponse {
  results: Product[];
  count: number;
  offset: number;
  limit: number;
}

export interface Product {
  id: string;
  key: string;
}

export const productService = {
  getProducts: async (): Promise<ProductResponse> => {
    const response = await api.get<ProductResponse>(
      `${baseUrl}/${Endpoints.PRODUCTS}`,
      {}
    );
    return response.data;
  },
};
