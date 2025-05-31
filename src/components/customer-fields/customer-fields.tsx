import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { RegisterFormValues } from '../../sources/types/register';
import { Input } from '../input/input';
import { FIELDS } from '../../sources/constants/register-fields';
import { validationRules } from '../../sources/constants/register-fields';
import styles from '../address-fields/address-field.module.css';

type Props = {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
};

const CUSTOMER_FIELDS = FIELDS.filter(
  field => field.name !== 'newPassword' && field.name !== 'currentPassword'
);

export const CustomerFields = ({ register, errors }: Props) => {
  return (
    <>
      {CUSTOMER_FIELDS.map(field => {
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
    </>
  );
};
