import type { Customer } from '../../../../sources/types/customer';
import type { GeneralInfoActions } from '../enums/general-info-actions';

type GeneralInfoAction = {
  action: GeneralInfoActions;
} & Partial<Customer.Profile>;

export type GeneralInfoUpdateBody = {
  version: number;
  actions: GeneralInfoAction[];
};
