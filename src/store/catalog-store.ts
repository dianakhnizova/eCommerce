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

  public fetchProducts = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await productService.getProducts();
      console.log('Полученные продукты:', data);
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

  public addProduct = async (product: Product) => {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await productService.addNewProducts(product);
      runInAction(() => {
        this.products.push(response.product);
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
