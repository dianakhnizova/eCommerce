import { makeAutoObservable, runInAction } from 'mobx';
import type { Customer } from '../sources/types/customer';
import { customerService } from '../api/services/customer-service/customer-service';
import { TokenManager } from '../api/token-manager';
import { LSKeys } from '../sources/enums/ls-keys';
import { cartStore } from './cart-store';
import { getErrorMessage } from './get-error-message';
import { toast } from 'react-toastify';
import type { AddressUpdateActions } from '../api/services/customer-service/enums/update-actions';

class UserStore {
  public isInitLoading = false;
  public isPending = false;
  public error = '';
  public user: Customer.Profile | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public get isAuth() {
    const isHaveUserToken = localStorage.getItem(LSKeys.USER_TOKEN);
    return this.user?.id && isHaveUserToken;
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
      if (!userID) return;
      const response = await customerService.getCustomerByID(userID);
      runInAction(() => {
        this.user = response;
        void cartStore.getCustomerCart();
      });
    } catch (error) {
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      this.isInitLoading = false;
      void cartStore.getAnonCart();
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
      this.error = getErrorMessage(error);
      toast.error(this.error);
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
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      this.isPending = false;
    }
  };

  public async signUp(customer: Customer.Profile) {
    runInAction(() => {
      this.isPending = true;
      this.error = '';
    });
    try {
      const response = await customerService.signupNewCustomer(customer);
      runInAction(() => {
        this.user = response.customer;
        localStorage.setItem(LSKeys.USER_ID, response.customer.id);
        void TokenManager.fetchUserToken(customer);
      });
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
        toast.error(this.error);
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
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      this.isInitLoading = false;
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
      this.error = getErrorMessage(error);
      toast.error(this.error);
    } finally {
      this.isPending = false;
    }
  };

  public logout() {
    runInAction(() => {
      this.isInitLoading = false;
      this.user = null;
      this.isPending = false;
      this.error = '';
    });
    TokenManager.cleanup();
  }
}

export const userStore = new UserStore();
