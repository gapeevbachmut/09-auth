// app/(public routes)/sign-in/page.tsx

'use client';

import css from './SignInPage.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api';
import { ApiError } from '@/app/api/api';
import { useAuthStore } from '@/lib/store/authStore';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  // Отримуємо метод із стора
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as LoginRequest;
      // Виконуємо запит
      const res = await login(formValues);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
        // Записуємо користувача у глобальний стан
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  };
  return (
    <div className={css.mainContent}>
      <h1 className={css.formTitle}>Sign in</h1>
      <form action={handleSubmit} className={css.form}>
        <label className={css.formGroup}>
          Email
          <input type="email" name="email" required className={css.input} />
        </label>
        <label className={css.formGroup}>
          Password
          <input
            type="password"
            name="password"
            required
            className={css.input}
          />
        </label>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;
