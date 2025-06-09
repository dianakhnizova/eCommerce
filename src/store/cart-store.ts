import { makeAutoObservable, runInAction } from 'mobx';
import type { Customer } from '../sources/types/customer';
import { LSKeys } from '../sources/enums/ls-keys';
import { cartService } from '../api/services/cart-service';
import { isApiError } from '../utils/is-api-error';
import { messages } from '../sources/messages';

export class CartStore {
  public cart: Customer.Cart | null = null;
  public isPending = false;
  public error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public async init() {
    this.isPending = true;
    this.error = null;

    try {
      const cartID = localStorage.getItem(LSKeys.CART_ID);
      if (cartID) {
        const response = await cartService.getCart(cartID);
        runInAction(() => {
          console.log('fetch cart by ID');
          console.log(response);
          this.cart = response;
        });
      } else {
        const response = await cartService.createCart();
        runInAction(() => {
          this.cart = response;
          console.log('create new cart');
          console.log(response);
          localStorage.setItem(LSKeys.CART_ID, response.id);
        });
      }
    } catch (error) {
      runInAction(() => {
        console.log(error);
        if (isApiError(error)) {
          this.error = error.response?.data?.message || messages.cartError;
          return;
        }
        this.error =
          error instanceof Error ? error.message : messages.cartError;
      });
    } finally {
      runInAction(() => {
        this.isPending = false;
        this.error = null;
      });
    }
  }

  public async addItem(product: { productId: string; quantity: number }) {
    if (!this.cart) return;

    this.isPending = true;
    this.error = null;

    try {
      const response = await cartService.addItemToCart(product, this.cart);
      runInAction(() => {
        console.log('add to cart ');
        console.log(response);
        this.cart = response;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        if (isApiError(error)) {
          this.error = error.response?.data?.message || messages.cartError;
          return;
        }
        this.error =
          error instanceof Error ? error.message : messages.cartError;
      });
    } finally {
      runInAction(() => {
        this.isPending = false;
        this.error = null;
      });
    }
  }

  public removeItem() {}

  public clear() {}
}

export const cartStore = new CartStore();
