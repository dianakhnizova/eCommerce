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
import {
  SortField,
  SortOrder,
} from '../pages/catalog-page/catalog-options/components/sorting-selects/enums';

export class CatalogStore {
  public products: Catalog.ProductProjection[] = [];
  public productList: ProductCard[] = [];
  public pagination: Pagination = {
    limit: LIMIT_PRODUCTS_ON_PAGE,
    offset: DEFAULT_OFFSET,
    count: DEFAULT_COUNT,
    total: DEFAULT_TOTAL,
  };
  public isLoading = false;
  public error: string | null = null;
  public sortField: SortField = SortField.Default;
  public sortOrder: SortOrder = SortOrder.Default;

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

  public setSort = (field: SortField, order: SortOrder) => {
    this.sortField = field;
    this.sortOrder = order;

    if (field === SortField.Default) {
      void this.getProducts();
      return;
    }

    const sortParam = `${field} ${order}`;
    console.log('Sort param:', sortParam);

    void this.getProducts(sortParam);
  };

  public resetSort = () => {
    this.sortField = SortField.Default;
    this.sortOrder = SortOrder.Default;
    void this.getProducts();
  };
}

export const catalogStore = new CatalogStore();
