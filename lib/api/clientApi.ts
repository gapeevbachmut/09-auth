import { type Note, type CreateNoteType } from '@/types/note';
import { nextServer } from './api';
import { type User } from '@/types/user';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

//  register
export type LogRequest = {
  email: string;
  password: string;
};

export const register = async (data: LogRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

//login

export const login = async (data: LogRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

//перевірка сессії

export const checkSession = async () => {
  const res = await nextServer.get<{ success: boolean }>('/auth/session');
  return res.data.success;
};

// Отримання об`єкта користувача - prifile

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

// edit profile

export const updateMe = async (data: { userName?: string }) => {
  const res = await nextServer.patch<User>('/users/me', data);
  return res.data;
};

// logout

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

//////////////////////////////////////

// запит на нотатки
export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag?: Note['tag']
): Promise<NotesResponse> {
  const config = {
    params: {
      search, // пошук - // ...(search !== '' && { q: search }),
      page, // сторінка
      perPage, // кількість на сторінці
      tag,
    },
    // headers: {
    //   // accept: 'application/json',
    //   Authorization: `Bearer ${myKey}`,
    // },
  };
  const responce = await nextServer.get<NotesResponse>(`/notes`, config);
  return responce.data;
}

//  одна нотатка

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const responce = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      // Authorization: `Bearer ${myKey}`,
    },
  });
  return responce.data;
};

//  видалення

export async function deleteNote(id: Note['id']): Promise<Note> {
  const responce = await nextServer.delete<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      // Authorization: `Bearer ${myKey}`,
    },
  });
  return responce.data;
}

//  додавання

export async function createNote(noteData: CreateNoteType): Promise<Note> {
  const responce = await nextServer.post<Note>(`/notes`, noteData, {
    headers: {
      accept: 'application/json',
      // Authorization: `Bearer ${myKey}`,
    },
  });
  return responce.data;
}

// список тегів for sidebar

export async function getTags(): Promise<Note['tag'][]> {
  // Теги фіксовані, тому просто повертаю масив
  return ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
}
