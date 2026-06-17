// import type { Metadata } from 'next';
// import Image from 'next/image';
// import Link from 'next/link';
// import { getMe } from '../../../lib/api/serverApi';
// import css from './ProfilePage.module.css';
// import { redirect } from 'next/navigation';

// export const metadata: Metadata = {
//   title: 'Profile | NoteHub',
//   description: 'User profile page in NoteHub.',
// };

// export default async function ProfilePage() {
//   const user = await getMe();

//   if (!user) {
//     redirect('/sign-in');
//   }

//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <div className={css.header}>
//           <h1 className={css.formTitle}>Profile Page</h1>
//           <Link href="/profile/edit" className={css.editProfileButton}>
//             Edit Profile
//           </Link>
//         </div>

//         <div className={css.avatarWrapper}>
//           <Image
//             src={user.avatar}
//             alt="User Avatar"
//             width={120}
//             height={120}
//             className={css.avatar}
//           />
//         </div>

//         <div className={css.profileInfo}>
//           <p>Username: {user.username}</p>
//           <p>Email: {user.email}</p>
//         </div>
//       </div>
//     </main>
//   );
// }

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import type { User } from '../../../types/user';
import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'User profile page in NoteHub.',
};

async function getProfileUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const res = await fetch('http://localhost:3000/api/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProfilePage() {
  const user = await getProfileUser();

  if (!user) {
    redirect('/sign-in');
  }

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
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
