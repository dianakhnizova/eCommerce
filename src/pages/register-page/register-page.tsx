import styles from './register-page.module.css';
import { Button } from '../../components/button/button.tsx';
import { ButtonVariants } from '../../components/button/enums.ts';
import logo from '../../../assets/images/logo.png';
import { Input } from '../../components/input/input.tsx';
import { CountrySelect } from '../../components/country-select/country-select.tsx';
import { getCountryOptions } from '../../components/country-select/countries.ts';
import { messages } from './messages.ts';
import { FIELDS } from './constants.ts';
import { Link } from 'react-router-dom';
import { PagePath } from '../../router/enums.ts';

export const RegisterPage = () => {
  const countryOptions = getCountryOptions();
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={logo} alt={messages.altLogoText} className={styles.logo} />
        <h2>{messages.buttons.signUp}</h2>
      </div>
      <p className={styles.signInHint}>
        {messages.alreadyHaveAnAccountText}
        <Link to={PagePath.loginPage}>{messages.buttons.signIn}</Link>
      </p>
      <form action="" className={styles.formContainer}>
        {FIELDS.map(field => {
          if (field.type === 'country-select') {
            return (
              <CountrySelect
                key={field.name}
                name={field.name}
                label={field.label}
                options={countryOptions}
                className={styles.formInput}
              />
            );
          }
          return (
            <Input
              key={field.name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              name={field.name}
              className={styles.formInput}
            />
          );
        })}
        <Button variant={ButtonVariants.primary} type="submit">
          {messages.buttons.signUp}
        </Button>
      </form>
    </div>
  );
};
