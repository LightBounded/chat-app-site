import { create } from "zustand";

export interface User {
  id: string;
  username: string;
}

interface UserState {
  users: User[];
  activeUserId: string | null;
  setActiveUserId: (id: string) => void;
  setUsers: (users: User[]) => void;
  addUser: (newUser: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  activeUserId: null,
  setActiveUserId: (id) => set({ activeUserId: id }),
  setUsers: (users: User[]) => set({ users }),
  addUser: (newUser: User) =>
    set((state) => ({ users: [...state.users, newUser] })),
}));
