import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { messages } from './messages.ts';

countries.registerLocale(enLocale);

export const getCountryOptions = () => {
  const countryObj = countries.getNames(messages.countriesLang, {
    select: messages.countriesSelect,
  });
  return Object.entries(countryObj).map(([code, name]) => ({
    value: code,
    label: name,
  }));
};
