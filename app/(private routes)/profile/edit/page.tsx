// app/profile/edit/page.tsx

'use client';

import css from './EditProfilePage.module.css';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const EditProfile = () => {
  const router = useRouter();

  const [username, setUserName] = useState('');

  const user = useAuthStore(state => state.user);

  useEffect(() => {
    getMe().then(user => {
      setUserName(user.username ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateMe({ username });
      // перенаправити на профіль
      router.push('/profile');
    } catch (error) {
      console.error('Oops, some error:', error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              // value={username}
              onChange={handleChange}
              defaultValue={username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <Link className={css.cancelButton} href="/profile" prefetch={false}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
