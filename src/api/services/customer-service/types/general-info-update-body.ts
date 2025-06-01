import type { Customer } from '../../../../sources/types/customer';
import type { UpdateActions } from '../enums/update-actions';

type GeneralInfoAction = {
  action: UpdateActions;
} & Partial<Customer.Profile>;

export type GeneralInfoUpdateBody = {
  version: number;
  actions: GeneralInfoAction[];
};
