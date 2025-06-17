import { makeAutoObservable, runInAction } from 'mobx';

import { LSKeys } from '../sources/enums/ls-keys';
import { cartService } from '../api/services/cart-service/cart-service';
import { messages } from '../sources/messages';
import type { Cart } from '../sources/types/cart';
import { toast } from 'react-toastify';
import { getErrorMessage } from './get-error-message';
import { userStore } from './user-store';
import { preparePromoCode } from '../utils/prepare-promo-code.ts';
import { catalogStore } from './catalog-store';
import type { ProductCard } from '../pages/catalog-page/catalog/product-list/types';
import { prepareCartItemForProductCard } from '../utils/prepare-product-card-for-cart';

export class CartStore {
  public cart: Cart.GeneralInfo | null = null;
  public isLoading = false;
  public error: string | null = null;
  public promoCodes: Cart.PromoCode[] = [];
  public originalPriceBeforeDiscount: Cart.GeneralInfo['totalPrice'] | null =
    null;
  public product: ProductCard[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public get totalPriceBeforePromoCode() {
    if (!this.cart) return null;

    const discount =
      this.cart.discountOnTotalPrice?.discountedAmount?.centAmount ?? 0;

    const total = this.cart.totalPrice.centAmount + discount;

    return {
      ...this.cart.totalPrice,
      centAmount: total,
    };
  }

  public getProduct = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      await catalogStore.getCategories();

      if (!this.cart) {
        runInAction(() => {
          this.product = [];
        });
        return;
      }

      const products = await Promise.all(
        this.cart.lineItems.map(item => prepareCartItemForProductCard(item))
      );

      runInAction(() => {
        this.product = products;
      });
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  public async addItem(product: { productId: string; quantity?: number }) {
    if (!this.cart) return;

    this.isLoading = true;
    this.error = null;

    try {
      const response = await cartService.addItemToCart(product, this.cart);
      runInAction(() => {
        this.cart = response;
        void this.getProduct();
        toast.success(messages.success.addToCart);
      });
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.error = null;
      });
    }
  }

  public async removeItem(productId: string) {
    if (!this.cart) return;
    this.isLoading = true;
    this.error = null;
    try {
      const item = this.cart.lineItems.find(
        item => item.productId === productId
      );

      if (!item) {
        throw new Error(messages.errors.productError);
      }

      const response = await cartService.removeItemFromCart(item.id, this.cart);
      runInAction(() => {
        this.cart = response;
        void toast.success(messages.success.removeFromCart);
      });
      await this.getProduct();
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      this.isLoading = false;
    }
  }

  public isInCart(productId: string): boolean {
    if (!this.cart) return false;
    return (
      this.cart.lineItems?.some(item => item.productId === productId) ?? false
    );
  }

  public async updateItemQuantity(productId: string, quantity: number) {
    if (!this.cart) return;
    const item = this.cart.lineItems.find(item => item.productId === productId);
    if (!item) {
      throw new Error(messages.errors.productError);
    }
    try {
      const item = this.cart.lineItems.find(
        item => item.productId === productId
      );

      if (!item) {
        throw new Error(messages.errors.productError);
      }

      const response = await cartService.updateItemQuantity(
        item.id,
        quantity,
        this.cart
      );
      runInAction(() => {
        this.cart = response;
        toast.success(messages.success.updateItemQuantity);
      });

      await this.getProduct();
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      this.isLoading = false;
    }
  }

  public getItemQuantity(productId: string): number {
    if (!this.cart) return 0;
    const item = this.cart.lineItems.find(item => item.productId === productId);
    if (!item) {
      return 0;
    }
    return item.quantity;
  }

  public async clear() {
    if (!this.cart || this.cart.lineItems.length === 0) {
      toast.info(messages.info.cartAlreadyEmpty);
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {
      const response = await cartService.clearCart(this.cart);
      runInAction(() => {
        this.cart = response;
        localStorage.removeItem(LSKeys.CART_ID);
        toast.success(messages.success.clearCart);
      });
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async delete() {
    this.isLoading = true;
    this.error = null;
    try {
      if (this.cart) {
        await cartService.deleteCart(this.cart);
        localStorage.removeItem(LSKeys.CART_ID);
      }
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      this.isLoading = false;
      this.error = null;
    }
  }

  public async getCustomerCart() {
    try {
      if (!userStore.user?.id) return;

      let cart = await cartService.getCustomerCart(userStore.user.id);
      if (!cart) cart = await cartService.createCart();

      runInAction(() => {
        this.cart = cart;
      });
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async getAnonCart() {
    try {
      const cartID = localStorage.getItem(LSKeys.CART_ID);

      let response: Cart.GeneralInfo;

      if (cartID) {
        response = await cartService.getCart(cartID);
      } else {
        response = await cartService.createCart();
        localStorage.setItem(LSKeys.CART_ID, response.id);
      }

      runInAction(() => {
        this.cart = response;
        void this.getProduct();
      });
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async addPromoCode(code: string) {
    if (!this.cart) return;

    this.isLoading = true;
    this.error = null;

    try {
      this.originalPriceBeforeDiscount = this.cart?.totalPrice;
      const updatedCart = await cartService.addPromoCode(code, this.cart);
      runInAction(() => {
        this.cart = updatedCart;
        toast.success(messages.promoCode.success);
      });
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async removePromoCode(discountCodeId: string) {
    if (!this.cart) return;

    this.isLoading = true;
    this.error = null;

    try {
      const updatedCart = await cartService.removePromoCode(
        discountCodeId,
        this.cart
      );

      runInAction(() => {
        this.cart = updatedCart;
        toast.success(messages.promoCode.removed);
      });
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async getActivePromoCodes() {
    this.isLoading = true;
    this.error = null;

    try {
      const data = await cartService.getActivePromoCodes();
      runInAction(() => {
        this.promoCodes = preparePromoCode(data);
      });
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const cartStore = new CartStore();
