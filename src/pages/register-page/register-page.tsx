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
    void userStore.signUp(data);
  };

  useEffect(() => {
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

          <h3>Default billing address</h3>
          <CountrySelect
            label="Country"
            options={countryOptions}
            className={styles.formInput}
            {...register('country', validationRules['country'])}
            error={errors?.country?.message}
          />
          <Input
            label="City"
            className={styles.formInput}
            {...register('city', validationRules['city'])}
            error={errors?.city?.message}
          />
          <Input
            label="Street"
            className={styles.formInput}
            {...register('street', validationRules['street'])}
            error={errors?.street?.message}
          />
          <Input
            label="Post Code"
            className={styles.formInput}
            {...register('postCode', validationRules['postCode'])}
            error={errors?.postCode?.message}
          />

          <Checkbox
            label="Set as default shipping address"
            checked={isSameAddress}
            onChange={e => {
              const value = e.target.checked;
              setIsSameAddress(value);
              if (value) {
                setValue('shippingCountry', getValues('country'));
                setValue('shippingCity', getValues('city'));
                setValue('shippingStreet', getValues('street'));
                setValue('shippingPostCode', getValues('postCode'));
              }
            }}
          />

          <h3>Default Shipping Address</h3>
          <CountrySelect
            label="Country"
            options={countryOptions}
            className={styles.formInput}
            disabled={isSameAddress}
            {...register('shippingCountry', {
              ...validationRules['country'],
              required: !isSameAddress && 'Country is required',
            })}
            error={errors.country?.message}
          />
          <Input
            label="City"
            className={styles.formInput}
            disabled={isSameAddress}
            {...register('shippingCity', {
              ...validationRules['city'],
              required: !isSameAddress && 'City is required',
            })}
            error={errors.city?.message}
          />
          <Input
            label="Street"
            className={styles.formInput}
            disabled={isSameAddress}
            {...register('shippingStreet', {
              ...validationRules['street'],
              required: !isSameAddress && 'Street is required',
            })}
            error={errors.street?.message}
          />
          <Input
            label="Post Code"
            className={styles.formInput}
            disabled={isSameAddress}
            {...register('shippingPostCode', {
              ...validationRules['postCode'],
              required: !isSameAddress && 'Post Code is required',
            })}
            error={errors.postCode?.message}
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
