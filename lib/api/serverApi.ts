// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { nextServer } from './api';
import { type Note } from '@/types/note';
import { NotesResponse } from './clientApi';
import { User } from '@/types/user';

//
//  ЗАВЖДИ при запиті із серверного компонента
//  додаємо кукі
//

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      // передаємо кукі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

//  отримання даних користувача.

export const getMeServer = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const responce = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return responce.data;
};

export async function fetchNotesServer(
  search: string,
  page: number,
  perPage: number,
  tag?: Note['tag']
): Promise<NotesResponse> {
  const cookieStore = await cookies();
  const config = {
    params: {
      search,
      page,
      perPage,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
  const responce = await nextServer.get(`/notes`, config);
  return responce.data;
}

// список тегів for sidebar

export async function getTagsServer(): Promise<Note['tag'][]> {
  // Теги фіксовані, тому просто повертаю масив
  return ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
}
