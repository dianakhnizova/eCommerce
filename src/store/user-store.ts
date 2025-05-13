import { makeAutoObservable, runInAction } from 'mobx';
import type { Customer } from '../sources/types/customer';
import { LSKeys } from '../sources/enums/ls-keys';
import { customerService } from '../api/services/customer-service';

class UserStore {
  public isPending = false;
  public error = '';
  public user: Customer.Profile | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public get isAuth() {
    return !!this.user?.id;
  }

  public login = async (
    creds: Pick<Customer.Profile, 'email' | 'password'>
  ) => {
    this.isPending = true;
    this.error = '';

    try {
      const response = await customerService.loginCustomer(creds);
      runInAction(() => {
        this.user = response.customer;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : String(error);
      });
    } finally {
      runInAction(() => {
        this.isPending = false;
      });
    }
  };

  public logout() {
    this.user = null;
    localStorage.removeItem(LSKeys.TOKEN);
  }
}

export const userStore = new UserStore();
