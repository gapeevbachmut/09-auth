// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { nextServer } from './api';

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

//  ЗАВЖДИ при запиті із серверного компонента додаємо кукі

// export const getNotes = async () => {
//   const cookieStore = await cookies();

//   const res = await nextServer.get('/notes', {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });

//   return res;
// };
