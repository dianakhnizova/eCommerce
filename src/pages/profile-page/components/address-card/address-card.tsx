import { FormProvider, useForm } from 'react-hook-form';

import { Checkbox } from '../../../../components/checkbox/checkbox';
import type { Customer } from '../../../../sources/types/customer';
import styles from '../../profile-page.module.css';
import {
  CustomerFieldName,
  type RegisterFormValues,
} from '../../../../sources/types/register';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/button/button';
import { messages } from '../../../../sources/messages';
import { validationRules } from '../../../../sources/constants/register-fields';
import { AddressFields } from '../../../register-page/address-fields/address-fields';
import { userStore } from '../../../../store/user-store';

interface AddressCardProps {
  address: Customer.Address;
}

export const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  const form = useForm<RegisterFormValues>();

  useEffect(() => {
    form.reset({
      [CustomerFieldName.country]: address.country,
      [CustomerFieldName.city]: address.city,
      [CustomerFieldName.street]: address.streetName,
      [CustomerFieldName.postCode]: address.postalCode,
    });
  }, [address, form]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onSubmit = async (data: RegisterFormValues) => {
    const draft = {
      id: address.id,
      city: data.city,
      country: data.country,
      postalCode: data.postCode,
      streetName: data.street,
    };

    await userStore.updateAddress(draft, {
      changeAddress: true,
      addAddress: false,
      addBillingAddressId: checkboxes.billing,
      addShippingAddressId: checkboxes.shipping,

      setDefaultBillingAddress: checkboxes.defaultBilling,
      setDefaultShippingAddress: checkboxes.defaultShipping,
      unsetDefaultBillingAddress:
        !checkboxes.defaultBilling && isDefaultBilling,
      unsetDefaultShippingAddress:
        !checkboxes.defaultShipping && isDefaultShipping,

      removeShippingAddressId: !checkboxes.shipping && isShipping,
      removeBillingAddressId: !checkboxes.billing && isBilling,

      removeAddress: false,
    });
    setIsEditMode(false);
  };

  const onEdit = () => {
    setIsEditMode(true);
  };

  const isDefaultShipping =
    address.id === userStore.user?.defaultShippingAddressId;
  const isDefaultBilling =
    address.id === userStore.user?.defaultBillingAddressId;

  const isBilling =
    userStore.user?.billingAddressIds?.includes(address.id || '') || false;
  const isShipping =
    userStore.user?.shippingAddressIds?.includes(address.id || '') || false;

  const [checkboxes, setCheckboxes] = useState({
    billing: isBilling,
    shipping: isShipping,
    defaultBilling: isDefaultBilling,
    defaultShipping: isDefaultShipping,
  });

  useEffect(() => {
    setCheckboxes({
      billing: isBilling,
      shipping: isShipping,
      defaultBilling: isDefaultBilling,
      defaultShipping: isDefaultShipping,
    });
  }, [isBilling, isShipping, isDefaultBilling, isDefaultShipping]);

  return (
    <div className={styles.section}>
      {isDefaultShipping && (
        <div className={styles.badge}>{messages.badges.defaultShipping}</div>
      )}
      {isDefaultBilling && (
        <div className={styles.badge}>{messages.badges.defaultBilling}</div>
      )}
      {isShipping && (
        <div className={styles.badge}>{messages.badges.shipping}</div>
      )}
      {isBilling && (
        <div className={styles.badge}>{messages.badges.billing}</div>
      )}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AddressFields
            cityField={CustomerFieldName.city}
            countryField={CustomerFieldName.country}
            postCodeField={CustomerFieldName.postCode}
            streetField={CustomerFieldName.street}
            register={form.register}
            errors={form.formState.errors}
            validationRules={validationRules}
            isEditMode={isEditMode}
          />
          <Checkbox
            disabled={!isEditMode}
            label={messages.badges.billing}
            checked={checkboxes.billing}
            onChange={event => {
              setCheckboxes(prev => ({
                ...prev,
                billing: event.target.checked,
              }));
            }}
          />
          <Checkbox
            disabled={!isEditMode}
            label={messages.badges.shipping}
            checked={checkboxes.shipping}
            onChange={event => {
              setCheckboxes(prev => ({
                ...prev,
                shipping: event.target.checked,
              }));
            }}
          />
          <Checkbox
            disabled={!isEditMode}
            label={messages.badges.defaultBilling}
            checked={checkboxes.defaultBilling}
            onChange={event => {
              setCheckboxes(prev => ({
                ...prev,
                defaultBilling: event.target.checked,
              }));
            }}
          />
          <Checkbox
            disabled={!isEditMode}
            label={messages.badges.defaultShipping}
            checked={checkboxes.defaultShipping}
            onChange={event => {
              setCheckboxes(prev => ({
                ...prev,
                defaultShipping: event.target.checked,
              }));
            }}
          />
          {isEditMode && <Button type="submit">{messages.buttons.save}</Button>}
        </form>
      </FormProvider>

      {!isEditMode && (
        <Button onClick={onEdit} className={styles.editBtn}>
          {messages.buttons.edit}
        </Button>
      )}
    </div>
  );
};
