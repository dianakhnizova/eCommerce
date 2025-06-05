import type { SelectHTMLAttributes } from 'react';

type Option = {
  value: string;
  label: string;
};

export type CountrySelectProps = {
  label?: string;
  error?: string;
  options: Option[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export enum CountriesSelectType {
  'official' = 'official',
  'all' = 'all',
  'alias' = 'alias',
}

export type Messages = {
  countriesLang: 'en';
  countriesSelect: CountriesSelectType;
  selectCountry: string;
};
