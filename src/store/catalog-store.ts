import { makeAutoObservable, runInAction } from 'mobx';
import { catalogService } from '../api/services/catalog-service';
import { messages } from '../sources/messages';
import { AxiosError } from 'axios';
import type { Catalog } from '../sources/types/catalog';
import type { ProductCard } from '../pages/catalog-page/product-card/types';
import { prepareProductCard } from '../utils/prepare-product-card';
import type { Pagination } from '../sources/types/pagination';
import {
  DEFAULT_COUNT,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  DEFAULT_TOTAL,
} from '../sources/constants/catalog';
import { preparePagination } from '../utils/prepare-pagination';

export class CatalogStore {
  public products: Catalog.Product[] = [];
  public productList: ProductCard[] = [];
  public originalList: ProductCard[] = [];
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
        const cards = data.results.map(prepareProductCard);
        this.products = data.results;
        this.productList = cards;
        this.originalList = cards;
        this.pagination = preparePagination(data);
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

  public sortByPriceAsc = () => {
    this.productList = [...this.productList].sort(
      (a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price)
    );
  };

  public sortByPriceDesc = () => {
    this.productList = [...this.productList].sort(
      (a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price)
    );
  };

  public sortByNameAsc = () => {
    this.productList = [...this.productList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  };

  public sortByNameDesc = () => {
    this.productList = [...this.productList].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  };

  public resetSort = () => {
    this.productList = [...this.originalList];
  };
}

export const catalogStore = new CatalogStore();
