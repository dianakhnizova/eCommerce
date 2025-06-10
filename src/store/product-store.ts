import { makeAutoObservable, runInAction } from 'mobx';
import { messages } from '../sources/messages';
import { AxiosError } from 'axios';
import { productService } from '../api/services/product-service.ts';
import { prepareDetailedProduct } from '../utils/prepare-detailed-product.ts';
import type { Catalog } from '../sources/types/catalog';
import { catalogStore } from './catalog-store.ts';

export class ProductStore {
  public product: Catalog.DetailedProduct | null;
  public isLoading = false;
  public error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.product = null;
  }

  public getProduct = async (id: string) => {
    this.isLoading = true;
    this.error = null;
    this.product = null;
    try {
      await catalogStore.getCategories();

      const data = await productService.getProductByID(id);
      runInAction(() => {
        this.product = prepareDetailedProduct(data);
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof AxiosError
            ? error.response?.data?.message || messages.errors.productError
            : messages.errors.productError;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}

export const productStore = new ProductStore();
