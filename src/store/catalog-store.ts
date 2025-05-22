import { makeAutoObservable, runInAction } from 'mobx';
import { productService } from '../api/services/product-service';
import { messages } from '../sources/messages';
import { AxiosError } from 'axios';
import type { Product } from '../sources/types/product';

export class CatalogStore {
  public products: Product[] = [];
  public isLoading = false;
  public error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public getProducts = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await productService.getProducts();
      runInAction(() => {
        this.products = data;
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
