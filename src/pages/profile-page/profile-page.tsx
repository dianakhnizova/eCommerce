import { FormProvider, useForm } from 'react-hook-form';
import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
import { Spinner } from '../../components/spinner/spinner';
import { Wrapper } from '../../components/wrapper/wrapper';
import { userStore } from '../../store/user-store';
import { BillingAddresses } from './components/billing-addresses';
import { ShippingAddresses } from './components/shipping-addresses';
import styles from './profile-page.module.css';
import { messages } from '../../sources/messages';
import { CustomerFormFields } from './components/customer-info-fields/customer-form-fields';
import { useState } from 'react';
import { Button } from '../../components/button/button';
import type { CustomerForm } from './components/customer-info-fields/types/customer-form';

export const ProfilePage = () => {
  const form = useForm<CustomerForm>({
    defaultValues: {
      firstName: userStore.user?.firstName,
      lastName: userStore.user?.lastName,
      dateOfBirth: userStore.user?.dateOfBirth,
      email: userStore.user?.email,
    },
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const onSubmit = (data: CustomerForm) => {
    console.log(data);
    if (data) setIsEditMode(false);
  };
  return (
    <>
      <Spinner isLoading={userStore.isPending} />;
      <BreadCrumbs />
      <Wrapper className={styles.aboutWrapper}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {!isEditMode && (
              <Button onClick={() => setIsEditMode(true)} children="Edit" />
            )}
            <h2 className={styles.title}>{messages.generalInfo}</h2>
            <div className={styles.section}>
              <CustomerFormFields
                isReadOnly={!isEditMode}
                errors={form.formState.errors}
                register={form.register}
              />
              {isEditMode && (
                <Button
                  type="submit"
                  children="Save"
                  className={styles.button}
                />
              )}
            </div>
          </form>
          <ShippingAddresses />
          <BillingAddresses />
        </FormProvider>
      </Wrapper>
    </>
  );
};
