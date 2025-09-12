// app/profile/edit/page.tsx

'use client';

import css from './EditProfilePage.module.css';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import Link from 'next/link';
import Image from 'next/image';

const EditProfile = () => {
  const [userName, setUserName] = useState('');

  const user = useAuthStore(state => state.user);

  useEffect(() => {
    getMe().then(user => {
      setUserName(user.userName ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateMe({ userName });
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
              name="name"
              className={css.input}
              value={userName}
              onChange={handleChange}
              defaultValue={user?.userName}
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
