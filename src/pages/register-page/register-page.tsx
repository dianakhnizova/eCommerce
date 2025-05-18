import styles from './register-page.module.css';
import { Button } from '../../components/button/button.tsx';
import { ButtonVariants } from '../../components/button/enums.ts';
import { Input } from '../../components/input/input.tsx';
import { CountrySelect } from '../../components/country-select/country-select.tsx';
import { getCountryOptions } from '../../components/country-select/countries.ts';
import { messages } from './messages.ts';
import { CHECKBOX_FIELDS, FIELDS, validationRules } from './constants.ts';
import { Link, useNavigate } from 'react-router-dom';
import { PagePath } from '../../router/enums.ts';
import { useForm } from 'react-hook-form';
import type { RegisterFormValues } from './types.ts';
import { useState } from 'react';
import type { Customer } from '../../sources/types/customer';
import { Checkbox } from '../../components/checkbox/checkbox.tsx';

export const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDefaultShipping, setIsDefaultShipping] = useState<boolean>(false);
  const [isDefaultBilling, setIsDefaultBilling] = useState<boolean>(false);
  const countryOptions = getCountryOptions();
  const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>();

  const onSubmit = (data: RegisterFormValues) => {
    setLoading(true);
    console.log('Form data:', data);
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
      defaultShippingAddress: isDefaultShipping ? 0 : undefined,
      defaultBillingAddress: isDefaultBilling ? 0 : undefined,
    };
    console.log(customer, 'customer');
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

            if (field.type === 'country-select') {
              return (
                <CountrySelect
                  key={field.name}
                  label={field.label}
                  options={countryOptions}
                  className={styles.formInput}
                  {...register(field.name, rules)}
                  error={error}
                />
              );
            }
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
          {CHECKBOX_FIELDS.map(field => {
            const isChecked =
              field.name === 'defaultShippingAddress'
                ? isDefaultShipping
                : isDefaultBilling;
            const onChange =
              field.name === 'defaultShippingAddress'
                ? setIsDefaultShipping
                : setIsDefaultBilling;
            return (
              <Checkbox
                key={field.name}
                type={field.type}
                label={field.label}
                checked={isChecked}
                onChange={e => onChange(e.target.checked)}
              />
            );
          })}
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
