import { useState } from 'react';
import { useAuth } from '../../context/AuthContext/useAuth';
import { Link, useNavigate } from 'react-router-dom';
// import { Turnstile } from '@marsidev/react-turnstile';

import styles from './Auth.module.scss';

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  captchaToken: string | null;
  isActivated: boolean;
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  // const turnstileRef = useRef<TurnstileInstance>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    captchaToken: null,
    isActivated: false,
  });

  // Общая функция для сброса виджета
  // const handleReset = () => {
  //   console.log('Сброс виджета Turnstile...')
  //   turnstileRef.current?.reset();
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Сбрасываем ошибку при вводе
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!formData.captchaToken) {
    //   setError('Пройдите верификацию Turnstile');
    //   return;
    // }

    if (formData.password !== formData.confirmPassword) {
      setError('The passwords you entered do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      const typedError = err as Error;
      setError(typedError.message || 'Register failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.registerPage}>
      <h1>Create new account</h1>

      {error && <div>{error}</div>}
      <form className={styles.registerPageForm} onSubmit={handleSubmit}>
        <div className={styles.formInputsGroup}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className={styles.formInput}
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className={styles.formInput}
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className={styles.button}
            type="button"
            title="Show Password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className={styles.formInput}
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* <Turnstile
          ref={turnstileRef}
          as="aside"
          siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
          options={{
            action: 'submit-form',
            theme: 'auto',
            size: 'normal',
            language: 'auto',
            refreshExpired: 'auto',
          }}
          scriptOptions={{
            appendTo: 'body',
          }}
          onSuccess={(token) => setFormData((prev) => ({ ...prev, captchaToken: token }))}
          onError={() => {
            setFormData((prev) => ({ ...prev, captchaToken: null }));
            setError('Error Turnstile');
            handleReset();
          }}
          onExpire={() => {
            setFormData((prev) => ({ ...prev, captchaToken: null }));
            setError('Token is expired.');
            handleReset();
          }}
        /> */}

        {/* <button type="submit" disabled={!formData.captchaToken || loading}> */}
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
        <div className="links-group">
          <p className={styles.p}>Have an account?</p>
          <Link className={styles.linksGroup} to="/login">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
