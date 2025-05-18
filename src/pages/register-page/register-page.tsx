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
import type { Customer } from '../../sources/types/customer';
import { Checkbox } from '../../components/checkbox/checkbox.tsx';

export const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [useSameAddress, setUseSameAddress] = useState<boolean>(true);
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
    setLoading(true);

    const customer: Customer.Profile = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      dateOfBirth: data.birth,
      addresses: [
        {
          country: data.country,
          city: data.city,
          streetName: data.street,
          postalCode: data.postCode,
        },
      ],
    };

    console.log('customer', customer);
    reset();
    void router(PagePath.root);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <h2>{messages.buttons.signUp}</h2>
      </div>
      <p className={styles.signInHint}>
        {messages.alreadyHaveAnAccountText}
        <Link to={PagePath.loginPage}>{messages.buttons.signIn}</Link>
      </p>
      <fieldset disabled={loading}>
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
            {...register('country', { required: true })}
            error={errors?.country?.message}
          />
          <Input
            label="City"
            className={styles.formInput}
            {...register('city', { required: true })}
            error={errors?.city?.message}
          />
          <Input
            label="Street"
            className={styles.formInput}
            {...register('street', { required: true })}
            error={errors?.street?.message}
          />
          <Input
            label="Post Code"
            className={styles.formInput}
            {...register('postCode', { required: true })}
            error={errors?.postCode?.message}
          />

          <Checkbox
            label="Set as default shipping address"
            checked={useSameAddress}
            onChange={e => {
              const value = e.target.checked;
              setUseSameAddress(value);
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
            disabled={useSameAddress}
            {...register('shippingCountry', {
              required: !useSameAddress && 'Country is required',
            })}
            error={errors.country?.message}
          />
          <Input
            label="City"
            className={styles.formInput}
            disabled={useSameAddress}
            {...register('shippingCity', {
              required: !useSameAddress && 'City is required',
            })}
            error={errors.city?.message}
          />
          <Input
            label="Street"
            className={styles.formInput}
            disabled={useSameAddress}
            {...register('shippingStreet', {
              required: !useSameAddress && 'Street is required',
            })}
            error={errors.street?.message}
          />
          <Input
            label="Post Code"
            className={styles.formInput}
            disabled={useSameAddress}
            {...register('shippingPostCode', {
              required: !useSameAddress && 'Post Code is required',
            })}
            error={errors.postCode?.message}
          />

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
};
