import { sessionStore } from '@/presentation/viewmodels/useSessionStore';

const API_URL = import.meta.env.VITE_API_URL;

const createHeaders = () => {
  const token = sessionStore.getState().accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

let refreshing: Promise<void> | null = null;

const refreshToken = async () => {
  if (!refreshing) {
    refreshing = (async () => {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) {
        sessionStore.getState().logout();
        throw new Error('Refresh failed');
      }
      const data = await response.json();
      sessionStore.getState().setAccessToken(data.accessToken);
    })().finally(() => {
      refreshing = null;
    });
  }
  await refreshing;
};

export const httpClient = async <T>(input: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_URL}${input}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...createHeaders(),
      ...(init?.headers || {})
    },
    credentials: 'include'
  });

  if (response.status === 401) {
    await refreshToken();
    const retry = await fetch(`${API_URL}${input}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...createHeaders(),
        ...(init?.headers || {})
      },
      credentials: 'include'
    });
    if (!retry.ok) {
      if (retry.status === 401) {
        sessionStore.getState().logout();
      }
      throw new Error('Request failed');
    }
    return retry.json();
  }

  if (!response.ok) {
    throw new Error('Request failed');
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
};
