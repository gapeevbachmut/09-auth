// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
// import { type Note, type CreateNoteType } from '@/types/note';

//
//  ЗАВЖДИ при запиті із серверного компонента
//  додаємо кукі
//

// export interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

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

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// export const getNotes = async () => {
//   const cookieStore = await cookies();

//   const res = await nextServer.get('/notes', {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });

//   return res;
// };

//////////////////////////////////////////////////////////////////

// // запит на нотатки
// export async function fetchNotes(
//   search: string,
//   page: number,
//   perPage: number,
//   tag?: Note['tag']
// ): Promise<NotesResponse> {
//   const config = {
//     params: {
//       search, // пошук - // ...(search !== '' && { q: search }),
//       page, // сторінка
//       perPage, // кількість на сторінці
//       tag,
//     },
//     // headers: {
//     //   // accept: 'application/json',
//     //   Authorization: `Bearer ${myKey}`,
//     // },
//   };
//   const responce = await nextServer.get<NotesResponse>(`/notes`, config);
//   return responce.data;
// }

// //  одна нотатка

// export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
//   const responce = await nextServer.get<Note>(`/notes/${id}`, {
//     headers: {
//       accept: 'application/json',
//       // Authorization: `Bearer ${myKey}`,
//     },
//   });
//   return responce.data;
// };

// //  видалення

// export async function deleteNote(id: Note['id']): Promise<Note> {
//   const responce = await nextServer.delete<Note>(`/notes/${id}`, {
//     headers: {
//       accept: 'application/json',
//       // Authorization: `Bearer ${myKey}`,
//     },
//   });
//   return responce.data;
// }

// //  додавання

// export async function createNote(noteData: CreateNoteType): Promise<Note> {
//   const responce = await nextServer.post<Note>(`/notes`, noteData, {
//     headers: {
//       accept: 'application/json',
//       // Authorization: `Bearer ${myKey}`,
//     },
//   });
//   return responce.data;
// }

// // список тегів for sidebar

// export async function getTags(): Promise<Note['tag'][]> {
//   // Теги фіксовані, тому просто повертаю масив
//   return ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
// }
