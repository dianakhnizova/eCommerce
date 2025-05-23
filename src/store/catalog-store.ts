import { makeAutoObservable, runInAction } from 'mobx';
import { catalogService } from '../api/services/catalog-service';
import { messages } from '../sources/messages';
import { AxiosError } from 'axios';
import type { Catalog } from '../sources/types/catalog';
import type { ProductCard } from '../pages/catalog-page/product-card/types';
import { prepareProductCard } from '../utils/prepare-product';
import type { Pagination } from '../sources/types/pagination';
import { prepareProductPagination } from '../utils/prepare-product';
import {
  DEFAULT_COUNT,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  DEFAULT_TOTAL,
} from '../sources/constants/catalog';

export class CatalogStore {
  public products: Catalog.Product[] = [];
  public productList: ProductCard[] = [];
  public pagination: Pagination = {
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    count: DEFAULT_COUNT,
    total: DEFAULT_TOTAL,
  };
  public isLoading = false;
  public error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public getProducts = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await catalogService.getProducts();
      runInAction(() => {
        this.products = data.results;
        this.productList = data.results.map(product =>
          prepareProductCard(product)
        );
        this.pagination = prepareProductPagination(data);
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof AxiosError) {
          this.error = error.response?.data?.message || messages.catalogError;
        }
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}

export const catalogStore = new CatalogStore();
