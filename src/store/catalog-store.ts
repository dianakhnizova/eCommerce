import { makeAutoObservable, runInAction } from 'mobx';
import { catalogService } from '../api/services/catalog-service';
import { messages } from '../sources/messages';
import { AxiosError } from 'axios';
import type { Catalog } from '../sources/types/catalog';
import type { ProductType } from '../pages/catalog-page/product-card/types';
import { DEFAULT_PRICE, DISCOUNT_PRICE } from '../sources/constants/catalog';

export class CatalogStore {
  public products: Catalog.Product[] = [];
  public productList: ProductType[] = [];
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
      const data = await catalogService.getProducts();
      runInAction(() => {
        this.products = data.results;
        this.productList = data.results.map(product => ({
          name: product.masterData.current.name.en || messages.noName,
          image:
            product.masterData.current.masterVariant.images[0]?.url ||
            messages.placeholderJpg,
          description:
            product.masterData.current.description.en || messages.noDescription,
          price: product.masterData.current.masterVariant.prices[0]?.value
            ? `${(product.masterData.current.masterVariant.prices[0].value.centAmount / 100).toFixed(2)} ${
                product.masterData.current.masterVariant.prices[0].value
                  .currencyCode
              }`
            : DEFAULT_PRICE,
          discountPrice: DISCOUNT_PRICE.toString(),
        }));
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
