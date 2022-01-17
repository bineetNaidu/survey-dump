import create from 'zustand';
import type { UserType } from '../types';

interface IUsersStore {
  authUser: UserType | null;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: (user: UserType) => void;
}

export const userStore = create<IUsersStore>((set) => ({
  authUser: null,
  isAuthenticated: false,
  logout: () => {
    set({
      authUser: null,
      isAuthenticated: false,
    });
  },
  setUser: (user) => {
    set({
      authUser: user,
      isAuthenticated: true,
    });
  },
}));
