import { useEffect } from 'react';
import styles from './login-page.module.css';
import { Input } from '../../components/input/input.tsx';
import { Button } from '../../components/button/button.tsx';
import { ButtonVariants } from '../../components/button/enums.ts';
import { messages } from './messages.ts';
import { useForm } from 'react-hook-form';
import { PagePath } from '../../router/enums.ts';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../store/user-store.ts';
import {
  FIELDS,
  validationRules,
} from '../../sources/constants/register-fields.ts';
import type { RegisterFormValues } from '../../sources/types/register.ts';

const LOGIN_FIELDS = FIELDS.filter(
  field => field.name === 'password' || field.name === 'email'
);

export const LoginPage = observer(() => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>();

  const onSubmit = async (customer: RegisterFormValues) => {
    await userStore.login(customer);
    if (!userStore.error) {
      reset();
    }
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
      void navigate(PagePath.root);
    }
  }, [userStore.isAuth, navigate, reset]);

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.header}>{messages.header}</h2>
        <p className={styles.hint}>{messages.hintText}</p>
      </div>
      <fieldset disabled={userStore.isPending}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          {LOGIN_FIELDS.map(field => {
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
          {userStore.error && <p className={styles.error}>{userStore.error}</p>}
          <Button
            variant={ButtonVariants.primary}
            className={styles.signUpButton}
            type="submit"
          >
            {messages.buttons.signIn}
          </Button>
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
});
