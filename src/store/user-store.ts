import { makeAutoObservable, runInAction } from 'mobx';
import type { Customer } from '../sources/types/customer';
import { customerService } from '../api/services/customer-service';
import { messages } from '../sources/messages';
import { TokenManager } from '../api/token-manager';
import { LSKeys } from '../sources/enums/ls-keys';
import { AxiosError } from 'axios';

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
          console.log(response);
          this.user = response;
        });
      }
    } catch (error) {
      runInAction(() => {
        console.log(error);
        if (error instanceof AxiosError) {
          this.error = error.response?.data?.message || messages.loginError;
          return;
        }
        this.error =
          error instanceof Error ? error.message : messages.loginError;
      });
    } finally {
      runInAction(() => {
        this.isInitLoading = false;
      });
    }
  };

  public login = async (customer: Customer.Profile) => {
    this.isPending = true;
    this.error = '';

    try {
      await TokenManager.fetchUserToken(customer);
      const response = await customerService.loginCustomer(customer);
      runInAction(() => {
        this.user = response.customer;
        localStorage.setItem(LSKeys.USER_ID, response.customer.id);
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof AxiosError) {
          this.error = error.response?.data?.message || messages.loginError;
          return;
        }
        this.error =
          error instanceof Error ? error.message : messages.loginError;
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
          this.error = error.response?.data?.message || messages.loginError;
          return;
        }
        this.error =
          error instanceof Error ? error.message : messages.loginError;
      });
    } finally {
      runInAction(() => {
        this.isPending = false;
      });
    }
  }

  public logout() {
    TokenManager.cleanup();
    localStorage.removeItem(LSKeys.USER_ID);
    this.user = null;
    this.error = '';
    this.isPending = false;
    this.isInitLoading = false;
  }
}

export const userStore = new UserStore();
