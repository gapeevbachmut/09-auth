import { type Note, type CreateNoteType } from '@/types/note';
import { nextServer } from './api';
import { type User } from '@/types/user';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export type LogRequest = {
  email: string;
  password: string;
};

export const register = async (data: LogRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LogRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<{ success: boolean }>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');

  return data;
};

export type UpdateMeRequest = {
  username?: User['username'];
  email?: string;
};

export const updateMe = async (data: UpdateMeRequest): Promise<User> => {
  const res = await nextServer.patch<User>('users/me', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag?: Note['tag']
): Promise<NotesResponse> {
  const config = {
    params: {
      search,
      page,
      perPage,
      tag,
    },
  };
  const responce = await nextServer.get<NotesResponse>(`/notes`, config);
  return responce.data;
}

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const responce = await nextServer.get<Note>(`/notes/${id}`, {});
  return responce.data;
};

export async function deleteNote(id: Note['id']): Promise<Note> {
  const responce = await nextServer.delete<Note>(`/notes/${id}`, {});
  return responce.data;
}

export async function createNote(noteData: CreateNoteType): Promise<Note> {
  const responce = await nextServer.post<Note>(`/notes`, noteData, {});
  return responce.data;
}

export async function getTags(): Promise<Note['tag'][]> {
  // не сам
  const res = await nextServer.get<NotesResponse>('/notes');

  const notes = res.data.notes;
  const tags = notes.map(note => note.tag);
  const uniqueTags = Array.from(new Set(tags));

  const baseTags: Note['tag'][] = [
    'Todo',
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
  ];

  const merged = Array.from(new Set([...baseTags, ...uniqueTags]));

  return merged;
}
