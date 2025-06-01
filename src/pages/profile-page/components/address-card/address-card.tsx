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
  isDefault: boolean;
  setDefault: (id: string) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  setDefault,
  isDefault = false,
}) => {
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
    console.log(data);
    if (data) {
      await userStore.updateShippingAddress(
        {
          id: address.id,
          city: data.city,
          country: data.country,
          postalCode: data.postCode,
          streetName: data.street,
        },
        isDefault
      );
      setIsEditMode(false);
    }
  };

  const onEdit = () => {
    setIsEditMode(true);
  };

  return (
    <div className={styles.section}>
      {isDefault && <div className={styles.badge}>{messages.default}</div>}

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
            label={messages.checkboxDefaultAddress}
            checked={isDefault}
            onChange={event => {
              const checked = event.target.checked;
              setDefault(checked ? address.id || '' : '');
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
