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
          <Input type="email" label="Email" placeholder="Email" name="email" />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
          />
          <Input
            type="text"
            label="First Name"
            placeholder="First Name"
            name="firstName"
          />
          <Input
            type="text"
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
          />
          <Input type="text" label="Birth" placeholder="Birth" name="birth" />
          <Input
            type="text"
            label="Country"
            placeholder="Country"
            name="country"
          />
          <Input type="text" label="City" placeholder="City" name="city" />
          <Input
            type="text"
            label="Street"
            placeholder="Street"
            name="street"
          />
          <Input
            type="text"
            label="Post code"
            placeholder="Post code"
            name="postCode"
          />
          <Button variant={ButtonVariants.primary} type="submit">
            Sign up
          </Button>
        </form>
      </div>
    </>
  );
};
