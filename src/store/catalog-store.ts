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
  LIMIT_PRODUCTS_ON_PAGE,
} from '../sources/constants/catalog';
import { preparePagination } from '../utils/prepare-pagination';
import {
  SortField,
  SortOrder,
} from '../pages/catalog-page/catalog-options/components/sorting-selects/enums';

export class CatalogStore {
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
  public error: string | null = null;
  public sortField: SortField = SortField.Default;
  public sortOrder: SortOrder = SortOrder.Default;
  public searchName: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  public getProducts = async (productName?: string) => {
    this.isLoading = true;
    this.error = null;
    try {
      await catalogStore.getCategories();

      if (productName) {
        this.selectedCategoryId = '';
        this.searchName = productName;
      }

      const data = await catalogService.getProducts(
        this.pagination.offset,
        this.pagination.limit,
        true,
        this.sortField,
        this.sortOrder,
        this.selectedCategoryId,
        this.searchName
      );

      runInAction(() => {
        this.productList = data.results.map(prepareProductCard);
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
    }
  };

  public setCategories = (categoryId: string) => {
    this.selectedCategoryId = categoryId;
  };

  public setSearchName = (name: string) => {
    this.searchName = name;
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
