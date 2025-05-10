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
