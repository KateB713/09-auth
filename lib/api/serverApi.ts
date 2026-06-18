import { cookies } from 'next/headers';
import type { Note } from '../../types/note';
import type { User } from '../../types/user';
import axios, { type AxiosResponse } from 'axios';

interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const serverApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return (
    cookieStore
      // .toString()
      .getAll()
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ')
  );
};

export const fetchNotes = async ({
  page = 1,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await serverApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await serverApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
};

export const checkSession = async (
  cookieHeader: string
): Promise<AxiosResponse<User>> => {
  return serverApi.get<User>('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });
};

export const getMe = async (): Promise<User | null> => {
  try {
    const { data } = await serverApi.get<User>('/users/me', {
      headers: {
        Cookie: await getCookieHeader(),
      },
    });

    return data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 401 || error.response?.status === 404)
    ) {
      return null;
    }

    throw error;
  }
};
