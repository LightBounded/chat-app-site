import { create } from "zustand";

export type User = {
  id: string;
  username: string;
  isOnline: boolean;
};

type UserState = {
  users: User[];
  activeUserId: string | null;
  setActiveUserId: (id: string) => void;
  setUsers: (users: User[]) => void;
  createUser: (newUser: User) => void;
};

export const useUserStore = create<UserState>((set) => ({
  users: [],
  activeUserId: null,
  setActiveUserId: (id) => set({ activeUserId: id }),
  setUsers: (users) => set({ users }),
  createUser: (newUser) =>
    set((state) => ({ users: [...state.users, newUser] })),
}));
