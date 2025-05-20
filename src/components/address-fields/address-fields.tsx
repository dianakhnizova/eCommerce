import type {
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
} from 'react-hook-form';
import type {
  RegisterFormValues,
  RegisterFieldName,
} from '../../pages/register-page/types';
import { getCountryOptions } from '../country-select/countries';
import { Input } from '../input/input';
import { CountrySelect } from '../country-select/country-select';
import { messages } from './messages';
import styles from './address-field.module.css';

type Props = {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  countryField: keyof RegisterFormValues;
  cityField: keyof RegisterFormValues;
  streetField: keyof RegisterFormValues;
  postCodeField: keyof RegisterFormValues;
  validationRules: Record<
    RegisterFieldName,
    RegisterOptions<RegisterFormValues>
  >;
  isRequired?: boolean;
};

export const AddressFields = ({
  register,
  errors,
  countryField,
  cityField,
  streetField,
  postCodeField,
  validationRules,
  isRequired = true,
}: Props) => {
  const countryOptions = getCountryOptions();

  return (
    <>
      <CountrySelect
        label={messages.country}
        options={countryOptions}
        className={styles.formInput}
        {...register(countryField, {
          ...validationRules[countryField],
          required: isRequired && messages.errorCountry,
        })}
        error={errors[countryField]?.message}
      />
      <Input
        label={messages.city}
        className={styles.formInput}
        {...register(cityField, {
          ...validationRules[cityField],
          required: isRequired && messages.errorCity,
        })}
        error={errors[cityField]?.message}
      />
      <Input
        label={messages.street}
        className={styles.formInput}
        {...register(streetField, {
          ...validationRules[streetField],
          required: isRequired && messages.errorStreet,
        })}
        error={errors[streetField]?.message}
      />
      <Input
        label={messages.postCode}
        className={styles.formInput}
        {...register(postCodeField, {
          ...validationRules[postCodeField],
          required: isRequired && messages.errorPostCode,
        })}
        error={errors[postCodeField]?.message}
      />
    </>
  );
};
