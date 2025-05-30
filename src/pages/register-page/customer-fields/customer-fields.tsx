import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { RegisterFormValues } from '../types';
import { Input } from '../../../components/input/input';
import { FIELDS } from '../constants';
import { validationRules } from '../constants';
import styles from '../address-fields/address-field.module.css';

type Props = {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
};

export const CustomerFields = ({ register, errors }: Props) => {
  return (
    <>
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
    </>
  );
};
