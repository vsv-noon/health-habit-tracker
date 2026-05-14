import { useState } from 'react';
import { forgotPassword } from '@/services/api/auth.api';
// import { useNavigate } from 'react-router-dom';

import styles from './ForgotPasswordPage.module.scss';

function ForgotPasswordPage() {
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
      // navigate('/login');
    } catch (err) {
      const typedError = err as Error;
      console.error('Error sending email', typedError.message);
    }
  };

  return (
    <div className={styles.forgotPassword}>
      <h1 className={styles.h1}>Password Reset</h1>
      <p>
        Forgot your password? Enter your email address and we&apos;ll send you a verification code
        to reset it.
      </p>
      <form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>
        <label>
          Email
          <input
            className={styles.formInput}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={handleChange}
          />
        </label>
        <button className={styles.formButton} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
