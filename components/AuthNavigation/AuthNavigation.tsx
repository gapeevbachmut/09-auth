// components/AuthNavigation/AuthNavigation.tsx

'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api';

import css from './AuthNavigation.module.css';

const AuthNavigation = () => {
  const router = useRouter();

  // Отримуємо поточну сесію та юзера
  const { isAuthenticated, user } = useAuthStore();

  // Отримуємо метод очищення глобального стану
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    // Викликаємо logout
    await logout();
    // Чистимо глобальний стан
    clearIsAuthenticated();
    // Виконуємо навігацію на сторінку авторизації
    router.push('/sign-in');
  };

  // Якщо є сесія - відображаємо Logout та інформацію про користувача
  // інакше - посилання на логін та реєстрацію
  return isAuthenticated ? (
    <li className={css.navigationItem}>
      <p className={css.userEmail}>{user?.email}</p>
      <button onClick={handleLogout} className={css.logoutButton}>
        Logout
      </button>
    </li>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
