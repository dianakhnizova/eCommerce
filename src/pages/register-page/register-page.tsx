import styles from './register-page.module.css';
import { Button } from '../../components/button/button.tsx';
import { ButtonVariants } from '../../components/button/enums.ts';
import { messages } from './messages.ts';
import { validationRules } from './constants.ts';
import { Link, useNavigate } from 'react-router-dom';
import { PagePath } from '../../router/enums.ts';
import { useForm } from 'react-hook-form';
import type { RegisterFormValues } from './types.ts';
import { RegisterFieldName } from './types.ts';
import { useState } from 'react';
import { Checkbox } from '../../components/checkbox/checkbox.tsx';
import { userStore } from '../../store/user-store.ts';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { createSignUpData } from './create-signup-data.tsx';
import { AddressFields } from '../../components/address-fields/address-fields.tsx';
import { CustomerFields } from '../../components/customer-fields/customer-fields.tsx';

export const RegisterPage = observer(() => {
  const [isSameAddress, useIsSameAddress] = useState<boolean>(false);
  const [isDefaultBilling, setIsDefaultBilling] = useState<boolean>(false);
  const [isDefaultShipping, setIsDefaultShipping] = useState<boolean>(false);
  const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    await userStore.signUp(
      createSignUpData(data, isSameAddress, isDefaultBilling, isDefaultShipping)
    );
  };

  useEffect(() => {
    if (userStore.error) {
      const timer = setTimeout(() => {
        userStore.resetError();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [userStore.error]);

  useEffect(() => {
    userStore.resetErrorAndPendingStatus();
    if (userStore.isAuth) {
      reset();
      void router(PagePath.root);
    }
  }, [userStore.user, router]);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <h2>{messages.buttons.signUp}</h2>
      </div>
      <p className={styles.signInHint}>
        {messages.alreadyHaveAnAccountText}
        <Link to={PagePath.loginPage}>{messages.buttons.signIn}</Link>
      </p>
      <fieldset disabled={userStore.isPending}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomerFields register={register} errors={errors} />

          <h3 className={styles.titleCheckBox}>
            {messages.headerForDefaultBillingAddress}
          </h3>

          <Checkbox
            label={messages.checkboxSetDefaultBillingAddress}
            checked={isDefaultBilling}
            onChange={event => {
              setIsDefaultBilling(event.target.checked);
            }}
          />

          <AddressFields
            register={register}
            errors={errors}
            countryField={RegisterFieldName.country}
            cityField={RegisterFieldName.city}
            streetField={RegisterFieldName.street}
            postCodeField={RegisterFieldName.postCode}
            validationRules={validationRules}
          />

          <Checkbox
            label={messages.checkboxUseShippingAddress}
            checked={isSameAddress}
            onChange={event => {
              useIsSameAddress(event.target.checked);
            }}
          />
          {!isSameAddress && (
            <>
              <h3 className={styles.titleCheckBox}>
                {messages.headerForDefaultShippingAddress}
              </h3>

              <Checkbox
                label={messages.checkboxSetDefaultShippingAddress}
                checked={isDefaultShipping}
                onChange={event => {
                  setIsDefaultShipping(event.target.checked);
                }}
              />

              <AddressFields
                register={register}
                errors={errors}
                countryField={RegisterFieldName.shippingCountry}
                cityField={RegisterFieldName.shippingCity}
                streetField={RegisterFieldName.shippingStreet}
                postCodeField={RegisterFieldName.shippingPostCode}
                validationRules={validationRules}
                isRequired={!isSameAddress}
              />
            </>
          )}
          {userStore.error && (
            <p className={styles.errorMessage}>{userStore.error}</p>
          )}

          <Button
            variant={ButtonVariants.primary}
            className={styles.signUpButton}
            type="submit"
          >
            {messages.buttons.signUp}
          </Button>
        </form>
      </fieldset>
    </div>
  );
});
