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
  DEFAULT_OFFSET,
  DEFAULT_TOTAL,
} from '../sources/constants/catalog';
import { preparePagination } from '../utils/prepare-pagination';
import { LIMIT_PRODUCTS_ON_PAGE } from '../sources/constants/catalog';

export class CatalogStore {
  public products: Catalog.Product[] = [];
  public productList: ProductCard[] = [];
  public originalList: ProductCard[] = [];
  public pagination: Pagination = {
    limit: LIMIT_PRODUCTS_ON_PAGE,
    offset: DEFAULT_OFFSET,
    count: DEFAULT_COUNT,
    total: DEFAULT_TOTAL,
  };
  public isLoading = false;
  public error: string | null = null;
  public sortField: string | null = null;
  public sortOrder: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public getProducts = async (sort?: string) => {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await catalogService.getProducts(
        this.pagination.offset,
        this.pagination.limit,
        true,
        sort
      );
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

  public setSort = (field: string, order: string) => {
    this.sortField = field;
    this.sortOrder = order;
    const sortParam =
      field === 'price'
        ? `masterData.current.masterVariant.prices[0]?.value.centAmount ${order === 'asc' ? 'asc' : 'desc'}`
        : `masterData.current.name.en ${order === 'asc' ? 'asc' : 'desc'}`;
    void this.getProducts(sortParam);
  };

  public resetSort = () => {
    this.sortField = null;
    this.sortOrder = null;
    void this.getProducts();
  };
}

export const catalogStore = new CatalogStore();
