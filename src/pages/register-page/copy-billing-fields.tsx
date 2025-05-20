import type { RegisterFormValues } from './types';
import { RegisterFieldName } from './types';

export const copyBillingToShipping = (
  isSameAddress: boolean,
  watch: (name: keyof RegisterFormValues) => string | undefined,
  setValue: (name: keyof RegisterFormValues, value: string) => void
) => {
  if (isSameAddress) {
    const billingFields = {
      country: watch(RegisterFieldName.country),
      city: watch(RegisterFieldName.city),
      street: watch(RegisterFieldName.street),
      postCode: watch(RegisterFieldName.postCode),
    };

    if (
      billingFields.country &&
      billingFields.city &&
      billingFields.street &&
      billingFields.postCode
    ) {
      setValue(RegisterFieldName.shippingCountry, billingFields.country);
      setValue(RegisterFieldName.shippingCity, billingFields.city);
      setValue(RegisterFieldName.shippingStreet, billingFields.street);
      setValue(RegisterFieldName.shippingPostCode, billingFields.postCode);
    }
  }
};
