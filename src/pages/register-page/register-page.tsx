import styles from './register-page.module.css';
import { Button } from '../../components/button/button.tsx';
import { ButtonVariants } from '../../components/button/enums.ts';
import logo from '../../../assets/images/logo.png';
import { Input } from '../../components/input/input.tsx';

export const registerPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h2>Sign up</h2>
        </div>
        <p>
          Already have an account? <a className={styles.ref}>Sign in</a>
        </p>
        <form action="" className={styles.formContainer}>
          <Input
            type="email"
            label="Email"
            placeholder="Email"
            name="email"
            className={styles.formInput}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            className={styles.formInput}
          />
          <Input
            type="text"
            label="First Name"
            placeholder="First Name"
            name="firstName"
            className={styles.formInput}
          />
          <Input
            type="text"
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
            className={styles.formInput}
          />
          <Input
            type="date"
            label="Birth"
            placeholder="Birth"
            name="birth"
            className={styles.formInput}
          />
          <Input
            type="text"
            label="Country"
            placeholder="Country"
            name="country"
            className={styles.formInput}
          />
          <Input
            type="text"
            label="City"
            placeholder="City"
            name="city"
            className={styles.formInput}
          />
          <Input
            type="text"
            label="Street"
            placeholder="Street"
            name="street"
            className={styles.formInput}
          />
          <Input
            type="text"
            label="Post code"
            placeholder="Post code"
            name="postCode"
            className={styles.formInput}
          />
          <Button variant={ButtonVariants.primary} type="submit">
            Sign up
          </Button>
        </form>
      </div>
    </>
  );
};
