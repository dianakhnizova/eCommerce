import styles from './register-page.module.css';
import { Button } from '../../components/button/button.tsx';
import { ButtonVariants } from '../../components/button/enums.ts';
import { Input } from '../../components/input/input.tsx';
import { CountrySelect } from '../../components/country-select/country-select.tsx';
import { getCountryOptions } from '../../components/country-select/countries.ts';
import { messages } from './messages.ts';
import { FIELDS, validationRules } from './constants.ts';
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

export const RegisterPage = observer(() => {
  const [isSameAddress, setIsSameAddress] = useState<boolean>(false);
  const countryOptions = getCountryOptions();
  const router = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    getValues,
  } = useForm<RegisterFormValues>();

  const onSubmit = (data: RegisterFormValues) => {
    console.log('Form data:', data);
    const signUpData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.birth,
      addresses: [
        {
          country: data.country,
          city: data.city,
          streetName: data.street,
          postalCode: data.postCode,
        },
        {
          country: data.shippingCountry,
          city: data.shippingCity,
          streetName: data.shippingStreet,
          postalCode: data.shippingPostCode,
        },
      ],
      defaultBillingAddress: 0,
      defaultShippingAddress: isSameAddress ? 0 : 1,
      shippingAddresses: [1],
    };
    void userStore.signUp(signUpData);
  };

  useEffect(() => {
    userStore.resetErrorAndPendingStatus();
    console.log({ userStore });
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
          {FIELDS.map(field => {
            const error = errors[field.name]?.message;
            const rules = validationRules[field.name];

            return (
              <Input
                key={field.name}
                type={field.type}
                label={field.label}
                placeholder={field.placeholder}
                className={styles.formInput}
                {...register(field.name, rules)}
                error={error}
              />
            );
          })}

          <h3>{messages.headerForDefaultBillingAddress}</h3>
          <CountrySelect
            label={messages.country}
            options={countryOptions}
            className={styles.formInput}
            {...register(
              RegisterFieldName.country,
              validationRules[RegisterFieldName.country]
            )}
            error={errors?.country?.message}
          />
          <Input
            label={messages.city}
            className={styles.formInput}
            {...register(
              RegisterFieldName.city,
              validationRules[RegisterFieldName.city]
            )}
            error={errors?.city?.message}
          />
          <Input
            label={messages.street}
            className={styles.formInput}
            {...register(
              RegisterFieldName.street,
              validationRules[RegisterFieldName.street]
            )}
            error={errors?.street?.message}
          />
          <Input
            label={messages.postCode}
            className={styles.formInput}
            {...register(
              RegisterFieldName.postCode,
              validationRules[RegisterFieldName.postCode]
            )}
            error={errors?.postCode?.message}
          />

          <Checkbox
            label={messages.checkboxDefaultShippingAddress}
            checked={isSameAddress}
            onChange={e => {
              const isChecked = e.target.checked;
              setIsSameAddress(isChecked);
              if (isChecked) {
                setValue(
                  RegisterFieldName.shippingCountry,
                  getValues(RegisterFieldName.country)
                );
                setValue(
                  RegisterFieldName.shippingCity,
                  getValues(RegisterFieldName.city)
                );
                setValue(
                  RegisterFieldName.shippingStreet,
                  getValues(RegisterFieldName.street)
                );
                setValue(
                  RegisterFieldName.shippingPostCode,
                  getValues(RegisterFieldName.postCode)
                );
              }
            }}
          />

          <h3>{messages.headerForDefaultShippingAddress}</h3>
          <CountrySelect
            label={messages.country}
            options={countryOptions}
            className={styles.formInput}
            disabled={isSameAddress}
            {...register(RegisterFieldName.shippingCountry, {
              ...validationRules[RegisterFieldName.country],
              required: !isSameAddress && 'Country is required',
            })}
            error={errors.shippingCountry?.message}
          />
          <Input
            label={messages.city}
            className={styles.formInput}
            disabled={isSameAddress}
            {...register(RegisterFieldName.shippingCity, {
              ...validationRules[RegisterFieldName.city],
              required: !isSameAddress && 'City is required',
            })}
            error={errors.shippingCity?.message}
          />
          <Input
            label={messages.street}
            className={styles.formInput}
            disabled={isSameAddress}
            {...register(RegisterFieldName.shippingStreet, {
              ...validationRules[RegisterFieldName.street],
              required: !isSameAddress && 'Street is required',
            })}
            error={errors.shippingStreet?.message}
          />
          <Input
            label={messages.postCode}
            className={styles.formInput}
            disabled={isSameAddress}
            {...register(RegisterFieldName.shippingPostCode, {
              ...validationRules[RegisterFieldName.postCode],
              required: !isSameAddress && 'Post Code is required',
            })}
            error={errors.shippingPostCode?.message}
          />
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
