import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  memberId: number;
  email?: string;
  name?: string;
  nickname: string;
  profileImageUrl: string;
  accountScope: "PUBLIC" | "FRIENDS" | "PRIVATE";
  followerCount: number;
  followingCount: number;
  travelDiaryCount: number;
  placesCount: number;
}

export interface ProfileInfo {
  nickname: string;
  accountScope: "PUBLIC" | "FRIENDS" | "PRIVATE";
  profileImageUrl: string | null;
}

interface AuthState {
  user: User | null;
  profileInfo: ProfileInfo | null;
  setUser: (user: User) => void;
  setProfileInfo: (info: ProfileInfo) => void;
  resetAuth: () => void;
}

export interface ProfileCard {
  nickname: string;
  profileImageUrl: string;
  accountScope: "PUBLIC" | "FRIENDS" | "PRIVATE";
  followerCount: number;
  followingCount: number;
  travelDiaryCount: number;
  placesCount: number;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profileInfo: null,
      setUser: (user) => set({ user }),
      setProfileInfo: (info) => set({ profileInfo: info }),
      resetAuth: () => set({ user: null, profileInfo: null }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
