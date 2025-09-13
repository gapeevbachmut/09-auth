import { cookies } from 'next/headers';
import { nextServer } from './api';
import { type Note } from '@/types/note';
import { type NotesResponse } from './clientApi';
import { User } from '@/types/user';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

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

export async function getTagsServer(): Promise<Note['tag'][]> {
  const cookieStore = await cookies();

  const res = await nextServer.get<NotesResponse>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

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
