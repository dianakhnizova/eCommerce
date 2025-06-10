import type { Customer } from '../../../../sources/types/customer';
import type { CustomerUpdateActions } from '../enums/update-actions';

type GeneralInfoAction = {
  action: CustomerUpdateActions;
} & Partial<Customer.Profile>;

export type GeneralInfoUpdateBody = {
  version: number;
  actions: GeneralInfoAction[];
};
