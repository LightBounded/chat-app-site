import { create } from "zustand";

export interface User {
  id: string;
  username: string;
}

interface UserState {
  users: User[];
  activeUserId: string | null;
  setActiveUserId: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  activeUserId: null,
  setActiveUserId: (id) => set({ activeUserId: id }),
}));
