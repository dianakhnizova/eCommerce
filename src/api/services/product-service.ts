import { api } from '../axios';
import { BASE_URL } from '../constants';
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
      `${BASE_URL}/${Endpoints.PRODUCTS}`,
      {}
    );
    return response.data;
  },
};
