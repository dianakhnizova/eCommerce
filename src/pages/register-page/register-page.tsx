import styles from './register-page.module.css';

export const registerPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src="" alt="logo" />
          <h2>Sign up</h2>
        </div>
        <p>
          Already have an account?<a className={styles.ref}> Sign in</a>
        </p>
        <form action="" className={styles.formContainer}>
          <div className={styles.smallContainer}>
            <label htmlFor="">Email</label>
            <input type="email" />
          </div>
          <div className={styles.smallContainer}>
            <label htmlFor="">Password</label>
            <input type="password" />
          </div>
          <div className={styles.smallContainer}>
            <label htmlFor="">First name</label>
            <input type="text" />
          </div>
          <div className={styles.smallContainer}>
            <label htmlFor="">Last name</label>
            <input type="text" />
          </div>
          <div className={styles.smallContainer}>
            <label htmlFor="">Birth</label>
            <input type="text" />
          </div>
          <div className={styles.smallContainer}>
            <label htmlFor="">Country</label>
            <input type="text" />
          </div>
          <div className={styles.smallContainer}>
            <label htmlFor="">City</label>
            <input type="text" />
          </div>
          <div className={styles.smallContainer}>
            <label htmlFor="">Street</label>
            <input type="text" />
          </div>
          <div className={styles.smallContainer}>
            <label htmlFor="">Post code</label>
            <input type="text" />
          </div>
          <button type="submit" className={styles.button}>
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};
