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
  MAX_PRICE,
  MAX_PRODUCT_LIMIT,
  MIN_PRICE,
} from '../sources/constants/catalog';
import { preparePagination } from '../utils/prepare-pagination';
import {
  SortField,
  SortOrder,
} from '../pages/catalog-page/catalog-options/components/sorting-selects/enums';
import { getAttributeValue } from '../utils/get-attribute-value';
import { AttributeType } from '../sources/enums/attributes';

export class CatalogStore {
  public productList: ProductCard[] = [];
  public categories: Catalog.ProductCategory[] = [];
  public selectedCategoryId: string = '';
  public selectedSubcategoryId: string = '';
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
  public selectedColors: string[] = [];
  public colorsList: string[] = [];
  public selectedSizes: string[] = [];
  public sizeList: string[] = [];
  public priceFrom?: number;
  public priceTo?: number;

  constructor() {
    makeAutoObservable(this);
  }

  public getProducts = async (productName?: string) => {
    this.isLoading = true;
    this.error = null;
    try {
      await this.getCategories();

      if (productName) {
        this.searchName = productName;
      }

      const data = await catalogService.getProducts(
        this.pagination.offset,
        this.pagination.limit,
        true,
        this.sortField,
        this.sortOrder,
        this.selectedCategoryId,
        this.selectedSubcategoryId,
        this.searchName,
        this.selectedColors,
        this.selectedSizes,
        this.priceFrom,
        this.priceTo
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

  public setColors = (colors: string[]) => {
    this.selectedColors = colors;
  };

  public setSizes = (sizes: string[]) => {
    this.selectedSizes = sizes;
  };

  public setSearchName = (name: string) => {
    this.searchName = name;
  };

  public setCategories = (categoryId: string) => {
    this.selectedCategoryId = categoryId;
    this.selectedSubcategoryId = '';
  };

  public setSubcategories = (subcategoryId: string) => {
    this.selectedSubcategoryId = subcategoryId;
  };

  public setPrice = (from?: number, to?: number) => {
    this.priceFrom = from;
    this.priceTo = to;
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

  public getCategoryList = () => {
    return this.categories
      .filter(category => !category.parent)
      .map(category => ({
        id: category.id,
        label: category.name?.en || category.id,
        checked: this.selectedCategoryId === category.id,
      }));
  };

  public getSubCategoryList = (parentId: string) => {
    return this.categories
      .filter(subcategory => subcategory.parent?.id === parentId)
      .map(subcategory => ({
        id: subcategory.id,
        label: subcategory.name?.en || subcategory.id,
        checked: this.selectedSubcategoryId === subcategory.id,
      }));
  };

  public getColorsAndSizes = async () => {
    if (this.colorsList.length > 0) {
      return;
    }

    this.error = null;
    try {
      const data = await catalogService.getProducts(0, MAX_PRODUCT_LIMIT, true);

      runInAction(() => {
        const colors: string[] = [];
        const sizes: string[] = [];

        data.results.forEach(product => {
          if (product.masterVariant?.attributes) {
            const color = getAttributeValue(
              product.masterVariant.attributes,
              AttributeType.COLOR
            );
            const size = getAttributeValue(
              product.masterVariant.attributes,
              AttributeType.SIZE
            );

            if (typeof color === 'string' && !colors.includes(color)) {
              colors.push(color);
            }
            if (typeof size === 'string' && !sizes.includes(size)) {
              sizes.push(size);
            }
          }
        });
        this.colorsList = colors.sort();
        this.sizeList = sizes.sort();
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof AxiosError) {
          this.error = error.response?.data?.message || messages.catalogError;
        }
      });
    }
  };

  public getPrice = async () => {
    this.error = null;
    try {
      const data = await catalogService.getProducts(0, MAX_PRODUCT_LIMIT, true);
      runInAction(() => {
        let minPrice = MIN_PRICE;
        let maxPrice = MAX_PRICE;

        data.results.forEach(product => {
          if (product.masterVariant?.prices?.[0]?.value?.centAmount) {
            const price = product.masterVariant.prices[0].value.centAmount;
            minPrice = Math.min(minPrice, price);
            maxPrice = Math.max(maxPrice, price);
          }
        });

        this.priceFrom = minPrice;
        this.priceTo = maxPrice;
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof AxiosError) {
          this.error = error.response?.data?.message || messages.catalogError;
        }
      });
    }
  };
}

export const catalogStore = new CatalogStore();
