// app/profile/page.tsx

import Link from 'next/link';
import css from './ProfilePage.module.css';
// import { Metadata } from 'next';
// import { type User } from '@/lib/api';
// import Image from 'next/image';

// type ProfileProps = { params: Promise<{ profile: User }> };

// export async function generateMetadata({
//   params,
// }: ProfileProps): Promise<Metadata> {
//   const { profile } = await params;
//   // const profile = user: User;

//   return {
//     title: `User name: ${profile.userName}`,
//     description: `Page of profile ${profile.userName}`,
//     openGraph: {
//       title: `User name: ${profile.userName}`,
//       description: `Page of profile ${profile.userName}`,
//       ///////////////////////////////////////////////////////  URL???
//       // url: `https://........./${profile.userName}`,
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

const Profile = () => {
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
          {/* <Image
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          /> */}
        </div>
        <div className={css.profileInfo}>
          {/* //////////////////////////////   name  and Email */}
          <p>Username: {}</p>
          <p>Email: {}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
