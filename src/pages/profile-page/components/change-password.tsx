import { Input } from '../../../components/input/input';
import styles from '../profile-page.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { userStore } from '../../../store/user-store';
import { Button } from '../../../components/button/button';
import { observer } from 'mobx-react-lite';
import type { RegisterFormValues } from '../../../sources/types/register';
import {
  FIELDS,
  validationRules,
} from '../../../sources/constants/register-fields';
import { RiEdit2Fill } from 'react-icons/ri';
import { messages } from '../../../sources/messages';

const CHANGE_PASS_FIELDS = FIELDS.filter(
  field => field.name === 'currentPassword' || field.name === 'newPassword'
);

export const ChangePassword = observer(() => {
  const form = useForm<RegisterFormValues>();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSuccess(false);
    if (!data.currentPassword || !data.newPassword) return;

    await userStore.changePassword(data.currentPassword, data.newPassword);

    if (userStore.user && !userStore.isPending) {
      await userStore.login({
        email: userStore.user.email,
        password: data.newPassword,
      });
      setIsSuccess(true);
    }
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);

    if (!userStore.error) setIsEditMode(false);
    form.reset();
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>{messages.password}</h2>
        {!isEditMode && (
          <Button
            onClick={() => setIsEditMode(true)}
            className={styles.editBtn}
          >
            <RiEdit2Fill size={20} />
            {messages.buttons.change}
          </Button>
        )}
      </div>
      {isEditMode && (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
            {CHANGE_PASS_FIELDS.map(field => {
              const error = form.formState.errors[field.name]?.message;
              return (
                <Input
                  key={field.name}
                  type={field.type}
                  label={field.label}
                  className={styles.input}
                  placeholder={field.placeholder}
                  {...form.register(field.name, validationRules[field.name])}
                  error={error}
                />
              );
            })}
            {userStore.error && (
              <div className={styles.error}>{userStore.error}</div>
            )}
            <Button
              type="submit"
              disabled={userStore.isPending}
              className={styles.button}
            >
              {messages.buttons.save}
            </Button>
          </form>
        </FormProvider>
      )}
      {isSuccess && (
        <p className={styles.success}>
          {messages.success.successPasswordChange}
        </p>
      )}
    </div>
  );
});
