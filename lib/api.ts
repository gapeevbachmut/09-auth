import axios from 'axios';
import { type Note, type CreateNoteType } from '@/types/note';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

// const perPage = 12;   //  перенести сюди ???

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
// axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
// axios.defaults.baseURL = 'https://notehub-api.goit.study';
// axios.defaults.baseURL = 'http://localhost:3000/api';
const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

// далі замінив axios на nextServer

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
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  };

  await new Promise(r => setTimeout(r, 2000));

  const responce = await nextServer.get<NotesResponse>(`/notes`, config);

  return responce.data;
}

//  одна нотатка

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const responce = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  });
  return responce.data;
};

//  видалення

export async function deleteNote(id: Note['id']): Promise<Note> {
  const responce = await nextServer.delete<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  });
  return responce.data;
}

//  додавання

export async function createNote(noteData: CreateNoteType): Promise<Note> {
  const responce = await nextServer.post<Note>(`/notes`, noteData, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  });
  return responce.data;
}

// список тегів for sidebar
export async function getTags(): Promise<Note['tag'][]> {
  // Теги фіксовані, тому просто повертаю масив
  return ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
}
////////////////////////////
//register

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};
//////////////////////
//login

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};
/////////////////////////
//перевірка сессії

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};
////////////////////////////
// Отримання об`єкта користувача

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
};
///////////////////////
// logout
export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};
