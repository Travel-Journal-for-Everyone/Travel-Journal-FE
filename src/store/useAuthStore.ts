import { create } from "zustand";

interface User {
  id: number;
  email: string;
  name?: string;
  nickname?: string;
  profileImageUrl?: string;
  refreshToken: string;
  deviceId: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
