import { makeAutoObservable, runInAction } from 'mobx';
import { catalogService } from '../api/services/catalog-service';
import { messages } from '../sources/messages';
import { AxiosError } from 'axios';
import type { Catalog } from '../sources/types/catalog';
import type { ProductCard } from '../pages/catalog-page/product-list/types';
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
  public categories: Catalog.ProductCategory[] = [];
  public selectedCategoryId: string = '';
  public pagination: Pagination = {
    limit: LIMIT_PRODUCTS_ON_PAGE,
    offset: DEFAULT_OFFSET,
    count: DEFAULT_COUNT,
    total: DEFAULT_TOTAL,
  };
  public isLoading = false;
  public isCategoryLoading = false;
  public error: string | null = null;
  public sortField: SortField = SortField.Default;
  public sortOrder: SortOrder = SortOrder.Default;

  constructor() {
    makeAutoObservable(this);
  }

  public getProducts = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await catalogService.getProducts(
        this.pagination.offset,
        this.pagination.limit,
        true,
        this.sortField,
        this.sortOrder,
        this.selectedCategoryId
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
  };

  public getCategories = async () => {
    if (this.categories.length > 0) {
      return;
    }

    this.isCategoryLoading = true;
    this.error = null;
    try {
      const data = await catalogService.getCategories();

      runInAction(() => {
        this.categories = data.results || [];
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof AxiosError) {
          this.error = error.response?.data?.message || messages.catalogError;
        }
      });
    } finally {
      runInAction(() => {
        this.isCategoryLoading = false;
      });
    }
  };

  public setCategories = (categoryId: string) => {
    this.selectedCategoryId = categoryId;
  };

  public getCategoryList = () => {
    return this.categories.map(category => ({
      id: category.id,
      label: category.name?.en || category.id,
      checked: this.selectedCategoryId === category.id,
    }));
  };
}

export const catalogStore = new CatalogStore();
