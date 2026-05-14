import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../services/api/auth.api';

import styles from './ResetPasswordPage.module.scss';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('The passwords you entered do not match.');
      return;
    }

    try {
      if (!token) return;
      await resetPassword(token, formData.password);
      navigate('/login');
    } catch (err) {
      const typedError = err as Error;
      setError(typedError.message || 'Error change password');
      console.error('Error send new password', typedError);
    }
  };

  return (
    <div className={styles.resetPassword}>
      <h1>Enter new password</h1>
      <form className={styles.resetPasswordForm} onSubmit={handleSubmit}>
        <div className={styles.formInputsGroup}>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="new password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="button"
            title="Show Password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
