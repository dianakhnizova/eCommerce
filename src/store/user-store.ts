import { makeAutoObservable, runInAction } from 'mobx';
import type { Customer } from '../sources/types/customer';
import { customerService } from '../api/services/customer-service/customer-service';
import { messages } from '../sources/messages';
import { TokenManager } from '../api/token-manager';
import { LSKeys } from '../sources/enums/ls-keys';
import { AxiosError } from 'axios';
import { isApiError } from '../utils/is-api-error';
import type { AddressUpdateActions } from '../api/services/customer-service/enums/update-actions';
import { cartStore } from './cart-store';

class UserStore {
  public isInitLoading = false;
  public isPending = false;
  public error = '';
  public user: Customer.Profile | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public get isAuth() {
    return !!this.user?.id;
  }

  public resetError() {
    this.error = '';
  }

  public resetErrorAndPendingStatus() {
    this.isPending = false;
    this.error = '';
  }

  public init = async () => {
    this.isInitLoading = true;
    this.error = '';

    try {
      const userID = localStorage.getItem(LSKeys.USER_ID);
      if (userID) {
        const response = await customerService.getCustomerByID(userID);
        runInAction(() => {
          this.user = response;
          void cartStore.init();
        });
      }
    } catch (error) {
      runInAction(() => {
        console.log(error);
        if (error instanceof AxiosError) {
          this.error =
            error.response?.data?.message || messages.errors.loginError;
          return;
        }
        this.error =
          error instanceof Error ? error.message : messages.errors.loginError;
      });
    } finally {
      runInAction(() => {
        this.isInitLoading = false;
        void cartStore.init();
      });
    }
  };

  public updateAddress = async (
    address: Customer.Address,
    actions: Partial<Record<AddressUpdateActions, boolean>>
  ): Promise<void> => {
    this.isPending = true;
    this.error = '';
    try {
      if (!this.user) return;
      let updated: Customer.Profile;

      if (!address.id) {
        updated = await customerService.addNewAddress(this.user, address);
        runInAction(() => {
          this.user = updated;
        });
      } else {
        updated = await customerService.updateAddress(
          this.user,
          address,
          actions
        );
      }

      runInAction(() => {
        this.user = updated;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        if (isApiError(error)) {
          this.error =
            error.response?.data?.message || messages.errors.updateAddressError;
          return;
        }
        this.error =
          error instanceof Error
            ? error.message
            : messages.errors.updateAddressError;
      });
    } finally {
      runInAction(() => {
        this.isPending = false;
      });
    }
  };

  public login = async (customer: Customer.Profile) => {
    this.isPending = true;
    this.error = '';

    try {
      await cartStore.delete();
      await TokenManager.fetchUserToken(customer);
      const response = await customerService.loginCustomer(customer);
      runInAction(() => {
        this.user = response.customer;
        localStorage.setItem(LSKeys.USER_ID, response.customer.id);
        void cartStore.getCustomerCart();
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof AxiosError) {
          this.error =
            error.response?.data?.message || messages.errors.loginError;
          return;
        }
        this.error =
          error instanceof Error ? error.message : messages.errors.loginError;
      });
    } finally {
      runInAction(() => {
        this.isPending = false;
      });
    }
  };

  public async signUp(customer: Customer.Profile) {
    this.isPending = true;
    this.error = '';
    try {
      const response = await customerService.signupNewCustomer(customer);
      runInAction(() => {
        this.user = response.customer;
        localStorage.setItem(LSKeys.USER_ID, response.customer.id);
      });
      await TokenManager.fetchUserToken(customer);
    } catch (error) {
      runInAction(() => {
        if (error instanceof AxiosError) {
          this.error =
            error.response?.data?.message || messages.errors.loginError;
          return;
        }
        this.error =
          error instanceof Error ? error.message : messages.errors.loginError;
      });
    } finally {
      runInAction(() => {
        this.isPending = false;
      });
    }
  }

  public async updateGeneralInfo(updateInfo: Customer.Profile) {
    try {
      if (!this.user) return;
      const updated = await customerService.updateCustomerGeneralInfo({
        ...this.user,
        ...updateInfo,
      });
      runInAction(() => {
        this.user = updated;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        if (isApiError(error)) {
          this.error =
            error.response?.data?.message || messages.errors.updateProfileError;
          return;
        }
        this.error =
          error instanceof Error
            ? error.message
            : messages.errors.updateProfileError;
      });
    } finally {
      runInAction(() => {
        this.isInitLoading = false;
      });
    }
  }
  public changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<Customer.Profile | undefined> => {
    this.isPending = true;
    this.error = '';
    try {
      if (!this.user) return;
      const updated = await customerService.changePassword(
        this.user,
        currentPassword,
        newPassword
      );
      runInAction(() => {
        this.user = updated;
        return updated;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        if (isApiError(error)) {
          this.error =
            error.response?.data?.message || messages.errors.updateProfileError;
          return;
        }
        this.error =
          error instanceof Error
            ? error.message
            : messages.errors.updateProfileError;
      });
    } finally {
      runInAction(() => {
        this.isPending = false;
      });
    }
  };

  public logout() {
    TokenManager.cleanup();
    void cartStore.getAnonCart();
    localStorage.removeItem(LSKeys.USER_ID);
    this.user = null;
    this.error = '';
    this.isPending = false;
    this.isInitLoading = false;
  }
}

export const userStore = new UserStore();
