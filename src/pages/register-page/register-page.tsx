import styles from './register-page.module.css';
import { Button } from '../../components/button/button.tsx';
import { ButtonVariants } from '../../components/button/enums.ts';
import { Input } from '../../components/input/input.tsx';
import { CountrySelect } from '../../components/country-select/country-select.tsx';
import { getCountryOptions } from '../../components/country-select/countries.ts';
import { messages } from './messages.ts';
import { FIELDS, validationRules } from './constants.ts';
import { Link } from 'react-router-dom';
import { PagePath } from '../../router/enums.ts';
import { SvgBuilder } from '../../components/svg-builder/svg-builder.tsx';
import { IconType } from '../../components/svg-builder/enums.ts';
import { useForm } from 'react-hook-form';
import type { FormValues } from './types.ts';

export const RegisterPage = () => {
  const countryOptions = getCountryOptions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <SvgBuilder iconType={IconType.LogoMain} className={styles.logo} />
        <h2>{messages.buttons.signUp}</h2>
      </div>
      <p className={styles.signInHint}>
        {messages.alreadyHaveAnAccountText}
        <Link to={PagePath.loginPage}>{messages.buttons.signIn}</Link>
      </p>
      <form
        action=""
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
                error={typeof error === 'string' ? error : undefined}
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
              error={typeof error === 'string' ? error : undefined}
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
    </div>
  );
};
