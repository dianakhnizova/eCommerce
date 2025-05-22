import { makeAutoObservable, runInAction } from 'mobx';
import { productService } from '../api/services/catalog-service';
import { messages } from '../sources/messages';
import { AxiosError } from 'axios';
import type { Catalog } from '../sources/types/catalog';

export class CatalogStore {
  public products: Catalog.Product[] = [];
  public limit: number = 0;
  public offset: number = 0;
  public count: number = 0;
  public total: number = 0;
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
        this.products = data.results;
        this.limit = data.limit;
        this.offset = data.offset;
        this.count = data.count;
        this.total = data.total;
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
