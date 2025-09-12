// app/profile/page.tsx

import Link from 'next/link';
import css from './ProfilePage.module.css';
import { getMeServer } from '@/lib/api/serverApi';

// import { Metadata } from 'next';
// import { type User } from '@/types/user';
import Image from 'next/image';

// type ProfileProps = { params: Promise<{ profile: User }> };

// export async function generateMetadata({
//   params,
// }: ProfileProps): Promise<Metadata> {
//   const { profile } = await params;
//   // const profile = user: User;

//   return {
//     title: `User - ${profile.userName}`,
//     description: `Page of profile ${profile.userName}`,
//     openGraph: {
//       title: `User - ${profile.userName}`,
//       description: `Page of profile ${profile.userName}`,
//       url: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
//       siteName: 'NoteHub',
//       images: [
//         {
//           url: '',
//           width: 1200,
//           height: 630,
//           alt: 'image',
//         },
//       ],
//       type: 'article',
//     },
//   };
// }

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
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.userName}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
