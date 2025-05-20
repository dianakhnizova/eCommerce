import { makeAutoObservable, runInAction } from 'mobx';
import type { Customer } from '../sources/types/customer';
import { LSKeys } from '../sources/enums/ls-keys';
import { customerService } from '../api/services/customer-service';
import { authService } from '../api/services/auth-service';
import { saveTokenToLS } from '../utils/save-token-to-ls';
import { messages } from '../sources/messages';
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
      const token = await authService.getUserToken(customer);
      saveTokenToLS(LSKeys.USER_TOKEN, token);
      const response = await customerService.loginCustomer(customer);
      runInAction(() => {
        this.user = response.customer;
        localStorage.setItem(
          LSKeys.USER_ID,
          JSON.stringify(response.customer.id)
        );
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
        localStorage.setItem(
          LSKeys.USER_ID,
          JSON.stringify(response.customer.id)
        );
      });
      const token = await authService.getUserToken(customer);
      saveTokenToLS(LSKeys.USER_TOKEN, token);
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
    localStorage.removeItem(LSKeys.USER_TOKEN);
    localStorage.removeItem(LSKeys.ANON_TOKEN);
    localStorage.removeItem(LSKeys.USER_ID);
    this.user = null;
    this.error = '';
    this.isPending = false;
    this.isInitLoading = false;
  }
}

export const userStore = new UserStore();
