'use client';

import css from './EditProfilePage.module.css';
import { getMe, updateMe, type UpdateMeRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const EditProfile = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    if (user) {
      setUsername(user.username ?? '');
    } else {
      getMe().then(fetchedUser => {
        setUsername(fetchedUser.username ?? '');
        setUser(fetchedUser);
      });
    }
  }, [user, setUser]);

  const handleSaveUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const updatedData: UpdateMeRequest = { username };
      const updatedUser = await updateMe(updatedData);
      setUser(updatedUser);
      router.back();
    } catch (error) {
      console.error('Oops, some error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
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
              name="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChange}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button className={css.cancelButton} type="button" onClick={goBack}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
