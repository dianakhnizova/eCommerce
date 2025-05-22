import { makeAutoObservable, runInAction } from 'mobx';
import { messages } from '../sources/messages';
import { AxiosError } from 'axios';
import { productService } from '../api/services/product-service.ts';
import type { Product } from '../sources/types/product';

export class ProductStore {
  public product: Product.Product | null;
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
      const data = await productService.getProductByID(id);
      runInAction(() => {
        this.product = data;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof AxiosError
            ? error.response?.data?.message || messages.productError
            : messages.productError;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}

export const productStore = new ProductStore();
