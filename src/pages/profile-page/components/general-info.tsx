import { Input } from '../../../components/input/input';
import styles from '../profile-page.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { userStore } from '../../../store/user-store';
import { Button } from '../../../components/button/button';
import { observer } from 'mobx-react-lite';
import type { RegisterFormValues } from '../../../sources/types/register';
import {
  FIELDS,
  validationRules,
} from '../../../sources/constants/register-fields';
import { messages } from '../messages';
import { RiEdit2Fill } from 'react-icons/ri';

const GENERAL_FIELDS = FIELDS.filter(
  field => !['password', 'newPassword', 'currentPassword'].includes(field.name)
);

export const GeneralInfo = observer(() => {
  const form = useForm<RegisterFormValues>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const user = userStore.user;
    if (user) {
      form.reset({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        birth: user.dateOfBirth || '',
      });
    }
  }, [userStore.user]);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSuccess(false);
    await userStore.updateGeneralInfo(data);

    if (!userStore.error && !userStore.isPending) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      setIsEditMode(false);
    }
  };
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>{messages.generalInfo}</h2>
        {!isEditMode && (
          <Button
            disabled={userStore.isPending}
            onClick={() => setIsEditMode(true)}
            className={styles.editBtn}
          >
            <RiEdit2Fill size={20} />
            {messages.edit}
          </Button>
        )}
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          {GENERAL_FIELDS.map(field => {
            const error = form.formState.errors[field.name]?.message;
            return (
              <Input
                disabled={!isEditMode}
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

          {isEditMode && (
            <Button type="submit" disabled={userStore.isPending}>
              {messages.save}
            </Button>
          )}
        </form>
      </FormProvider>
      {isSuccess && (
        <p className={styles.success}>{messages.successGeneralInfoUpdate}</p>
      )}
    </div>
  );
});
