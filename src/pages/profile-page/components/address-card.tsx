import { FormProvider, useForm } from 'react-hook-form';

import { Checkbox } from '../../../components/checkbox/checkbox';
import type { Customer } from '../../../sources/types/customer';
import styles from '../profile-page.module.css';
import {
  CustomerFieldName,
  type RegisterFormValues,
} from '../../../sources/types/register';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/button/button';
import { messages } from '../../../sources/messages';
import { validationRules } from '../../../sources/constants/register-fields';
import { AddressFields } from '../../register-page/address-fields/address-fields';
import { userStore } from '../../../store/user-store';
import classNames from 'classnames';
import { RiDeleteBin5Fill, RiEditFill } from 'react-icons/ri';

interface AddressCardProps {
  address: Customer.Address;
  isEdit?: boolean;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isEdit = false,
}) => {
  const form = useForm<RegisterFormValues>();

  const [isEditMode, setIsEditMode] = useState<boolean>(isEdit || false);

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
    });
    setIsEditMode(false);
  };

  const onEdit = () => {
    setIsEditMode(true);
  };

  const onDelete = async () => {
    await userStore.updateAddress(address, {
      removeAddress: true,
    });
  };

  const isDefaultShipping =
    address.id === userStore.user?.defaultShippingAddressId;

  const isDefaultBilling =
    address.id === userStore.user?.defaultBillingAddressId;

  const isBilling =
    userStore.user?.billingAddressIds?.includes(
      address.id || messages.emptyValue
    ) || false;

  const isShipping =
    userStore.user?.shippingAddressIds?.includes(
      address.id || messages.emptyValue
    ) || false;

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
    <div className={styles.addressCard}>
      <div className={styles.addressCardHeader}>
        #{address.id}
        <div className={styles.addressCardMenu}>
          {!isEditMode && (
            <Button
              onClick={onEdit}
              className={styles.editBtn}
              disabled={userStore.isPending}
            >
              <RiEditFill size={20} />
              {messages.buttons.edit}
            </Button>
          )}
          {!isEditMode && (
            <Button
              onClick={onDelete}
              disabled={userStore.isPending}
              className={styles.editBtn}
            >
              <RiDeleteBin5Fill size={20} />
              {messages.buttons.delete}
            </Button>
          )}
        </div>
      </div>
      {!isEditMode && (
        <div className={styles.addressBadges}>
          {isDefaultShipping && (
            <div className={classNames(styles.badge, styles.badgeDefault)}>
              {messages.badges.defaultShipping}
            </div>
          )}
          {isDefaultBilling && (
            <div className={classNames(styles.badge, styles.badgeDefault)}>
              {messages.badges.defaultBilling}
            </div>
          )}
          {isShipping && (
            <div className={styles.badge}>{messages.badges.shipping}</div>
          )}
          {isBilling && (
            <div className={styles.badge}>{messages.badges.billing}</div>
          )}
        </div>
      )}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
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
          {isEditMode && (
            <>
              <Checkbox
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
                label={messages.badges.defaultShipping}
                checked={checkboxes.defaultShipping}
                onChange={event => {
                  setCheckboxes(prev => ({
                    ...prev,
                    defaultShipping: event.target.checked,
                  }));
                }}
              />
            </>
          )}
          {isEditMode && (
            <Button type="submit" disabled={userStore.isPending}>
              {messages.buttons.save}
            </Button>
          )}
        </form>
      </FormProvider>
    </div>
  );
};
