import { create } from 'zustand';
import { UserProfile, TrialUsage } from '@/domain/models';

interface SessionState {
  accessToken: string | null;
  user: UserProfile | null;
  permissions: string[];
  trial: TrialUsage | null;
  setAccessToken: (token: string) => void;
  setUser: (user: UserProfile) => void;
  setTrial: (trial: TrialUsage) => void;
  logout: () => void;
}

export const sessionStore = create<SessionState>((set) => ({
  accessToken: localStorage.getItem('access_token'),
  user: null,
  permissions: [],
  trial: null,
  setAccessToken: (token) => {
    localStorage.setItem('access_token', token);
    set({ accessToken: token });
  },
  setUser: (user) => set({ user, permissions: user.permissions }),
  setTrial: (trial) => set({ trial }),
  logout: () => {
    localStorage.removeItem('access_token');
    set({ accessToken: null, user: null, permissions: [], trial: null });
    window.location.assign('/login');
  }
}));
