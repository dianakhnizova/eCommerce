import { Input } from '../../../../components/input/input';
import styles from '../../profile-page.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { messages } from './constants/messages';
import { userStore } from '../../../../store/user-store';
import { Button } from '../../../../components/button/button';
import { GeneralInfoFormFields } from './constants/general-info-form-fields';
import type { FormFields } from './form-fields';
import { rules } from './constants/rules';

export const GeneralInfo = () => {
  const form = useForm<FormFields>({
    defaultValues: {
      firstName: userStore.user?.firstName,
      lastName: userStore.user?.lastName,
      dateOfBirth: userStore.user?.dateOfBirth,
      email: userStore.user?.email,
    },
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const onSubmit = (data: FormFields) => {
    console.log(data);
    if (data) setIsEditMode(false);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>{messages.generalInfo}</h2>
        {!isEditMode && (
          <Button
            onClick={() => setIsEditMode(true)}
            children="Edit"
            className={styles.editBtn}
          />
        )}
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {GeneralInfoFormFields.map(field => {
            const error = form.formState.errors[field.name]?.message;
            return (
              <Input
                disabled={!isEditMode}
                key={field.name}
                type={field.type}
                label={field.label}
                className={styles.input}
                placeholder={field.placeholder}
                {...form.register(field.name, rules[field.name])}
                error={error}
              />
            );
          })}

          {isEditMode && (
            <Button type="submit" children="Save" className={styles.button} />
          )}
        </form>
      </FormProvider>
    </div>
  );
};
