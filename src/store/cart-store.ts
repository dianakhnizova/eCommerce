import { makeAutoObservable, runInAction } from 'mobx';
import { LSKeys } from '../sources/enums/ls-keys';
import { cartService } from '../api/services/cart-service/cart-service';
import { isApiError } from '../utils/is-api-error';
import { messages } from '../sources/messages';
import type { Cart } from '../sources/types/cart';

export class CartStore {
  public cart: Cart.GeneralInfo | null = null;
  public isLoading = false;
  public error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public async init() {
    this.isLoading = true;
    this.error = null;

    try {
      const cartID = localStorage.getItem(LSKeys.CART_ID);
      if (cartID) {
        const response = await cartService.getCart(cartID);
        runInAction(() => {
          this.cart = response;
        });
      } else {
        const response = await cartService.createCart();
        runInAction(() => {
          this.cart = response;
          localStorage.setItem(LSKeys.CART_ID, response.id);
        });
      }
    } catch (error) {
      runInAction(() => {
        console.log(error);
        if (isApiError(error)) {
          this.error =
            error.response?.data?.message || messages.errors.cartError;
          return;
        }
        this.error =
          error instanceof Error ? error.message : messages.errors.cartError;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.error = null;
      });
    }
  }

  public async addItem(product: { productId: string; quantity: number }) {
    if (!this.cart) return;

    this.isLoading = true;
    this.error = null;

    try {
      const response = await cartService.addItemToCart(product, this.cart);
      runInAction(() => {
        this.cart = response;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        if (isApiError(error)) {
          this.error =
            error.response?.data?.message || messages.errors.cartError;
          return;
        }
        this.error =
          error instanceof Error ? error.message : messages.errors.cartError;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.error = null;
      });
    }
  }

  public removeItem() {}

  public isInCart(productId: string): boolean {
    if (!this.cart) return false;
    return (
      this.cart.lineItems?.some(item => item.productId === productId) ?? false
    );
  }

  public clear() {}
}

export const cartStore = new CartStore();
