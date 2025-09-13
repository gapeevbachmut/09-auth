import Link from 'next/link';
import css from './ProfilePage.module.css';
import { getMeServer } from '@/lib/api/serverApi';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'User Profile',
  description:
    'Viewing and manage your notes and personal information on your profile.',

  openGraph: {
    title: 'User Profile',
    description:
      'Viewing and manage your notes and personal information on your profile.',
    url: 'https://https://09-auth-mocha-phi.vercel.app',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
        width: 1200,
        height: 630,
        alt: 'image',
      },
    ],
    type: 'profile',
  },
};

const Profile = async () => {
  const user = await getMeServer();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
