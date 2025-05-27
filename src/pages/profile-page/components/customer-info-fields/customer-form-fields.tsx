import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '../../../../components/input/input';
import React from 'react';
import styles from './input.module.css';
import { CustomerFields } from './constants/customer-fields';
import { rules } from './constants/rules';
import type { CustomerForm } from './types/customer-form';

type Props = {
  register: UseFormRegister<CustomerForm>;
  errors: FieldErrors<CustomerForm>;
  isReadOnly: boolean;
};

export const CustomerFormFields: React.FC<Props> = ({
  errors,
  register,
  isReadOnly,
}) => {
  return (
    <>
      {CustomerFields.map(field => {
        const error = errors[field.name]?.message;

        return (
          <Input
            disabled={isReadOnly}
            key={field.name}
            type={field.type}
            label={field.label}
            className={styles.input}
            placeholder={field.placeholder}
            {...register(field.name, rules[field.name])}
            error={error}
          />
        );
      })}
    </>
  );
};
