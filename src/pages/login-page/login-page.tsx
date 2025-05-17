import { TestSignUp } from '../../components/test-sign-up';
import styles from './login-page.module.css';
import { Input } from '../../components/input/input.tsx';
import { FIELDS, validationRules } from './constants.ts';
import { Button } from '../../components/button/button.tsx';
import { ButtonVariants } from '../../components/button/enums.ts';
import { messages } from './messages.ts';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PagePath } from '../../router/enums.ts';
import { Link, useNavigate } from 'react-router-dom';
import type { LoginFormValues } from './types.ts';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    console.log('Form data:', data);
    setTimeout(() => {
      setIsLoading(false);
      reset();
      void navigate(PagePath.root);
    }, 500);
  };

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.header}>{messages.header}</h2>
        <p className={styles.hint}>{messages.hintText}</p>
      </div>
      <fieldset disabled={isLoading}>
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
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                className={styles.formInput}
                {...register(field.name, rules)}
                error={error}
              />
            );
          })}
          <Button
            variant={ButtonVariants.primary}
            className={styles.signUpButton}
            type="submit"
          >
            {messages.buttons.signIn}
          </Button>
          <TestSignUp />
        </form>
      </fieldset>
      <p>
        {messages.dontHaveAccountText}
        <Link to={PagePath.registerPage} className={styles.hint}>
          {messages.createAccountText}
        </Link>
      </p>
    </div>
  );
};
